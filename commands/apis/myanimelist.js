/* eslint-disable indent */
const rfr = require('rfr');
const {
  animeSearch,
  searchAnimeByGender,
  scheduler,
} = rfr('./core/myanimelistCore');

module.exports = {
  name: 'mal',
  description: 'It returns info about the anime you typed it from Myanimelist API',
  aliases: ['myanimelist'],
  usage: '<name of the anime you want to look up',
  cooldown: 5,
  async execute(message, args) {
    if (!args) return message.reply('Type the name of the anime you wanna look up, fucking weeb.');
    const search = args.slice(1).join(' ').replace(/[ ]/gi, '_').toLowerCase();
    let info;

    if (args[0] == '-anime') {

      return await animeSearch(message, search);
    }
    else if (args[0] == '-manga') {
      return await animeSearch(message, search, false);
    }
    else if (args[0] == '-schedule') {
      return await scheduler(message, search);
    }
    else if (args[0] == '-genre') {
      info = await searchAnimeByGender(search);
    }

    message.channel.send(`<@!${message.author.id}>`, info)
      .catch(err => console.error(err.stack));
  },
};