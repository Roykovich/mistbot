/* eslint-disable indent */
const rfr = require('rfr');
const { translation } = rfr('./core/translator');

/** Todo
 * 1 - autenticador (done)
 * 2 - soprote a varios idiomas (done)
 * 3 - checkear strings
 * 4 - handlers.
 */

module.exports = {
  name: 'translator',
  description: 'It translates whatever you give to the bot... In theory.',
  aliases: ['translate', 'traducir', 'traduce'],
  usage: '<first language> / <second language> / <text to translate>',
  cooldown: 15,
  async execute(message, args) {
    const arguments = args.join(' ').split(' / ');
    const firstLan = arguments[0];
    const secondLan = arguments[1];
    const result =
      await translation(arguments[2], firstLan, secondLan);

    if (result == 400) {
      return message.reply('Insert a correct code!');
    }
    const embed = {
      'author': {
        'name': 'Mist Bot Translator with Googlesheets',
      },
      'color': 12370112,
      'fields': [
        {
          'name': `${result.inputFlag} ${result.inputLang} (${firstLan.toUpperCase()})`,
          'value': arguments[2],
          'inline': true,
        },
        {
          'name': `${result.outputFlag} ${result.outputLang} (${secondLan.toUpperCase()})`,
          'value': result.translation,
          'inline': true,
        },
      ],
      footer: {
        'text': 'Esta vaina es una alpha asi que faltan muchas cosas por arreglar',
      },
    };


    message.channel.send(`<@!${message.author.id}>`, { embed })
      .catch(err => console.error(err.stack));
  },
};