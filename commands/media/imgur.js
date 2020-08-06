/* eslint-disable indent */
const rp = require('request-promise');
const rfr = require('rfr');
const Chance = require('chance');
const chance = new Chance();
const { imgurCredentials: imgurKey } = rfr('./settings.json');

/**
 * Todo:
 *  - NSFW handler
 */

module.exports = {
  name: 'imgur',
  description: 'It returns a random (by default) image from Imgur.',
  aliases: [''],
  usage: '<thing\'s you want to get>',
  cooldown: 5,
  async execute(message, args) {
    if (!args) return message.reply('Type something to search at imgur!');

    const imgur = {
      uri: 'https://api.imgur.com/3/gallery/search/top/0/',
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: `Client-ID ${imgurKey.clientId}`,
      },
      qs: {
        q: args[0],
      },
      json: true,
    };

    rp(imgur)
      .then((body) => {
        console.log(body);
        if (body.success && (body.data && body.data.length > 0)) {
          const image = chance.pickone(body.data.filter(i => {
            return !i.is_album && !i.is_ad;
          }));
          console.log(image);
          message.reply({
            embed: {
              title: '[sauce]',
              url: 'https://imgur.com/#{image.id}',
              image: { url: image.link },
            },
          });
        }
        else { message.reply('Error 404. Oops, something went wrong'); }
      })
      .catch((error) => {
        if (error.statusCode == 403) return message.reply('We reached the daily request limit :(');
        if (error.statusCode == 404) return message.reply('Error 404. Oops, something went wrong');
        if (error.statusCode == 401) return message.reply('Error 401. Oops Rubén went wrong.');
      });
  },
};
