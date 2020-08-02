/* eslint-disable */
const rp = require('request-promise');

module.exports = {
  name: 'urbandictionary',
  description: 'Searchs in the urbandictionary website any match from a given word',
  aliases: ['urban', 'ud'],
  usage: '<term you want to get a definition for it>',
  cooldown: 10,
  async execute(message, args) {
    // if no term specified, return an error message.
    if (!args) return message.reply('type a term to define!');

    const term = args[0];
    // config to the request
    const token = {
      uri: `http://urbanscraper.herokuapp.com/search/${term}`,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };

    // embed object
    const embed = {
      'author': {
        'name': 'Urban Dictionary',
        'url': 'https://g.udimg.com/assets/apple-touch-icon-2ad9dfa3cb34c1d2740aaf1e8bcac791e2e654939e105241f3d3c8b889e4ac0c.png',
      },
      'color': 2897212,
      'fields': [],
    };
    // We store 1 to 3 definitions in an array
    const definitions = [];

    // We start making the request to the API
    message.channel.startTyping(1);
    await rp(token)
      .then((body) => {
        // If the API doesn't return anything, we give an error message to the
        // embed object and return it.
        if (body.length < 1) {
          embed.description = 'Error 404 from API. Term not found.';
          return message.channel.send({ embed })
            .catch(err => console.error(err.stack));
        }

        const json = Array.from(body);
        // We loop to at least 1 definition 
        for (let i = 0; i < 4; i++) {
          // I use this to avoid a default definition that UD always give
          // for some reason
          if (i == 1) continue;

          // Everything from below it's just definitions and other things
          // that the API returns.
          const definition = json[i];
          embed.title = definition.term;
          embed.url = definition.url;
          embed.description = definition.definition;
          embed.description += `\`\`\`\n${definition.example}\`\`\``;
          embed.fields[0] = {
            'name': 'Author:',
            'value': definition.author,
            'inline': true,
          };
          embed.fields[1] = {
            'name': 'id',
            'value': definition.id,
            'inline': true,
          };
          embed.timestamp = definition.posted;
          embed.footer = { 'text': 'API provided by UrbanScraper' };

          // We add a new embed object to the definitions array.
          definitions.push({ ...embed });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // And finally we return all the definitions we got
    message.channel.send(`<@!${message.author.id}>`);
    for (let i = 0; i < definitions.length; i++) {
      message.channel.send({ embed: definitions[i] })
        .catch(err => console.error(err.stack));
    }
  },
};
