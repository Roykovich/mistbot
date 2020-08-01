/* eslint-disable indent */
const rp = require('request-promise');
const token = {
  uri: 'https://wowtokenprices.com/current_prices.json',
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
};

module.exports = {
  name: 'wowtoken',
  description: 'Return the WoW token princes of any region.',
  aliases: ['ficha', 'tokendewow', 'lechuga'],
  usage: '[command name]',
  cooldown: 15,
  async execute(message) {
    // We create our good boy embed object.
    const embed = {
      'author': {
        'name': 'WoW Token Prices',
      },
      'color': 12370112,
      'fields': [],
      'image': {
        'url': 'https://cdn.discordapp.com/attachments/731987400863252502/731987531985321984/lettuce.png',
      },
    };

    // We make the request to the WoW Token Price API
    await rp(token)
      .then((body) => {
        // We loop through every price depending on the region.
        Object.keys(body).forEach((key) => {
          // We just add the fields with the required data
          // pretty self-explicative.
          embed.fields.push({
            'name': `${body[key].region.toUpperCase()}`,
            // eslint-disable-next-line no-useless-escape
            'value': `\:moneybag: Price: **${new Intl.NumberFormat()
              .format(body[key].current_price)}**g`,
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });

    message.channel.send(`<@!${message.author.id}>`, { embed })
      .catch(err => console.error(err.stack));
  },
};