/* eslint-disable indent */
const rp = require('request-promise');

/**
 * TODO
 * 1 - recomendador
 * 2 - mover todo esto a funciones en el core
 * 3 - manga searcher
 * 4 - Ver documentacion a ver si se te ocurre otra cosa
 */

module.exports = {
  name: 'mal',
  description: 'It returns info about the anime you typed it from Myanimelist API',
  aliases: ['myanimelist'],
  usage: '<name of the anime you want to look up',
  cooldown: 5,
  async execute(message, args) {
    if (!args) return message.reply('Type the name of the anime you wanna look up, fucking weeb.');
    const search = args.join(' ').replace(/[ ]/gi, '_');
    let animeID;

    // pun intended....
    const genrenator = (genres) => {
      const result = [];
      for (const genre of genres) {
        result.push(genre.name);
      }
      return result.join(', ');
    };

    const options = {
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };


    await rp(`https://api.jikan.moe/v3/search/anime?q=${search}`, options)
      .then((body) => {
        animeID = body.results[0].mal_id;
        console.log(animeID);
      })
      .catch((err) => {
        console.error(err);
      });

    rp(`https://api.jikan.moe/v3/anime/${animeID}`, options)
      .then((anime) => {
        message.reply({
          embed: {
            title: `${anime.title} (${anime.title_japanese})`,
            url: anime.url.replace('\\', ''),
            description: anime.synopsis + '\n',
            color: 3035554,
            image: {
              url: anime.image_url.replace('\\', ''),
            },
            author: {
              name: 'MyAnimeList',
              url: 'https://myanimelist.net',
              icon_url: 'https://cdn.discordapp.com/attachments/731987400863252502/742666095109996634/favicon.png',
            },
            fields: [
              {
                name: 'Type',
                value: anime.type,
                inline: true,
              },
              {
                name: 'Source',
                value: anime.source,
                inline: true,
              },
              {
                name: 'Episodes',
                value: anime.episodes,
                inline: true,
              },
              {
                name: 'Status',
                value: `${anime.status}.\n Aired ${anime.aired.string}`,
                inline: true,
              },
              {
                name: 'Genres',
                value: `${genrenator(anime.genres)}.`,
                inline: true,
              },
              {
                name: 'Rating',
                value: anime.rating,
                inline: true,
              },
            ],
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });

  },
};