/* eslint-disable indent */
const rp = require('request-promise');
const rfr = require('rfr');
const { danbooru: auth } = rfr('./settings.json');

const police = ['loli', 'rori', 'shota', 'lolicon', 'toddlercon', 'gore', 'guro', 'vore'];

/**
 * TODO
 * tag parser
*/

module.exports = {
  name: 'danbooru',
  description: 'It returns a random image of the char you wanted from danbooru',
  aliases: ['dan'],
  usage: '<tags you wanna look up>',
  cooldown: 5,
  async execute(message, args) {
    if (!args) return message.reply('Type the name of the char you wanna look up, you perv');
    const tags = args.join(' ').replace('-', '_');

    for (const tag of args) {
      for (const nope of police) {
        console.log(tag);
        console.log(nope);
        if (tag === nope) return message.channel.send('https://cdn.discordapp.com/attachments/731987400863252502/739710218245767218/maxresdefault.png');
      }
    }

    const danbooru = {
      uri: 'https://danbooru.donmai.us/posts/random.json',
      headers: {
        'User-Agent': 'Request-Promise',
        auth: {
          user: auth.user,
          apiKey: auth.apiKey,
        },
      },
      qs: {
        tags,
      },
      json: true,
    };
    rp(danbooru)
      .then((body) => {
        const url = body.file_url.match(/^http/)
          ? body.file_url.replace('//data', '/data')
          : `https://danbooru.donmai.us${body.file_url.replace('//data', '/data')}`;

        message.reply({
          embed: {
            title: '[sauce]',
            url: `https://danbooru.donmai.us/posts/${body.id}`,
            image: { url },
          },
        });
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          console.error(err);
          message.reply('Error 404. Oops, something went wrong');
        }
        else if (err.statusCode === 422) {
          message.reply('You only can search for 1 tag at a time... For some fucking reason.');
          console.error(err.error);
        }
        else {
          message.reply('Something went really wrong');
          console.error(err.error);
        }
      });
  },
};