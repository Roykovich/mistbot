/* eslint-disable indent */
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { googleSheetsCredentials: creds, sheetId } = require('../settings.json');
const { languages: langs } = require('../data/data.json');
const exp = module.exports = {};

async function translateResult(input, firstLan, secondLan) {
  const result = {
    inputLang: '',
    outputLang: '',
    status: 400,
  };

  for (const lang of langs) {
    if (lang.codeID == firstLan) {
      result.inputLang = lang.language;
      result.inputFlag = lang.flag;
      result.status = 200;

    }
    else if (lang.codeID == secondLan) {
      result.outputLang = lang.language;
      result.outputFlag = lang.flag;
      result.status = 200;
    }
  }

  if (result.inputLang == '') {
    return 400;
  }
  else if (result.outputLang == '') {
    return 400;
  }
  else {
    await translateInput(input, firstLan, secondLan);
    result.translation = await translateOutput();
    return result;
  }
}

// This function sets the info the sheet cells
async function translateInput(input, firstLan, secondLan) {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  await sheet.loadCells();

  const inputCell = sheet.getCellByA1('A2');
  const outputCell = sheet.getCellByA1('B2');

  outputCell.formula = `=GOOGLETRANSLATE(A2,"${firstLan}", "${secondLan}")`;
  inputCell.value = input;
  await sheet.saveUpdatedCells();
}

// This function fetch the info of the cells after they are uploaded and updated
async function translateOutput() {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  await sheet.loadCells();

  const translation = sheet.getCellByA1('B2');

  return translation.value;
}
exp.translation = translateResult;