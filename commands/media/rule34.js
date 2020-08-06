/* eslint-disable indent */
const rp = require('request-promise');
const Chance = require('chance');
const chance = new Chance();

/** TODO
 * I dunno what to really do yet
 */

module.exports = {
  name: 'rule34',
  description: 'returns an image from rule34, y\'know. If exists, there\'s porn of it',
  aliases: ['r34'],
  usage: '<tag 1> / <tag 2> / <tag 3> ... <tag n>',
  cooldown: 5,
  async execute(message, args) {
    if (!args) return message.reply('Type the tags of the char you wanna look up, you perv');

    const tags = args.join(' ').split(/ *[|/] */).map((tag) => {
      return tag.replace(/[- ]/, '_');
    }).join('+').toLowerCase();

    // Discord Community Guidelines.
    if (tags.match(/loli|rori|shota|lolicon|toddlercon|gore|guro|vore/gi)) {
      return message.channel.send('https://cdn.discordapp.com/attachments/731987400863252502/739710218245767218/maxresdefault.png');
    }

    const rule34 = {
      uri: `https://r34-json.herokuapp.com/posts?tags=${tags}`,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };

    const embed = {
      title: '[sauce]',
      color: 9889703,
    };

    rp(rule34)
      .then((body) => {
        if (body.count == '0') return message.reply('Nothing found.');
        // We don't want videos because Discord Embeds doesn't support them yet.
        // >:(
        const post = chance.pickone(body.posts.filter(i => {
          return i.type != 'video';
        }));
        // We arrenge the link
        const url = post.file_url.substring(42, post.file_url.length)
          .replace('//images', '/images');

        embed.image = {
          url,
        };
        embed.url = `https://rule34.xxx/index.php?page=post&s=view&id=${post.id}`;

        message.reply({ embed });
      })
      .catch((err) => {
        message.reply('Oops, something went wrong.');
        console.error(err);
      });
  },
};