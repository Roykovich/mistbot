/* eslint-disable indent */
const rfr = require('rfr');
const champData = rfr('./data/league_champs.json');
const Chance = require('chance');
const chance = new Chance();
const champs = Object.keys(champData);

/** TODO
 * 1 - Role parser
 */

module.exports = {
  name: 'randomchamp',
  description: `It returns a random champ from one of the ${champs.length + 1} champs.`,
  aliases: ['campeonrandom', 'leaguerandom', 'lrandom', 'lolrandom', 'rleague'],
  usage: '',
  async execute(message) {
    // Filter for the reactions and the user.
    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name)
        && user.id === message.author.id;
    };
    // Our ol' good boy embed.
    const embed = {
      author: {
        name: 'League of Legends',
        iconURL: 'https://cdn.discordapp.com/attachments/731987400863252502/741535429274239046/Leagueicon.png',
      },
      color: 295335,
    };

    const reactFunc = async () => {
      const championChoosed = chance.pickone(champs);
      embed.description = `You should play with **${championChoosed}**!`;
      embed.thumbnail = {
        url: champData[championChoosed].icon,
      };

      const firstChamp = await message.reply({ embed });
      await firstChamp.react('👍').then(() => firstChamp.react('👎'));

      firstChamp.awaitReactions(filter, {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === '👍') {
            message.reply({
              embed: {
                author: {
                  name: `${championChoosed} (${champData[championChoosed].EA} - ${champData[championChoosed].EN})`,
                  iconURL: 'https://cdn.discordapp.com/attachments/731987400863252502/741535429274239046/Leagueicon.png',
                },
                color: 295335,
                thumbnail: {
                  url: champData[championChoosed].icon,
                },
                fields: [
                  {
                    name: 'Resource',
                    value: champData[championChoosed].Resource,
                    inline: true,
                  },
                  {
                    name: 'Attributes',
                    value: champData[championChoosed].Attributes,
                    inline: true,
                  },
                  {
                    name: 'Health',
                    value: champData[championChoosed].HP,
                    inline: true,
                  },
                  {
                    name: 'Health per 5 seconds',
                    value: champData[championChoosed].HP5,
                    inline: true,
                  },
                  {
                    name: 'Mana',
                    value: champData[championChoosed].MP === '' ?
                      0 : champData[championChoosed].MP,
                    inline: true,
                  },
                  {
                    name: 'Mana per 5 seconds',
                    value: champData[championChoosed].MP5 === '' ?
                      0 : champData[championChoosed].MP5,
                    inline: true,
                  },
                  {
                    name: 'Movement Speed',
                    value: champData[championChoosed].MS,
                    inline: true,
                  },
                  {
                    name: 'Range',
                    value: champData[championChoosed].Range,
                    inline: true,
                  },
                  {
                    name: 'AD',
                    value: champData[championChoosed].AD,
                    inline: true,
                  },
                  {
                    name: 'Attack Speed',
                    value: champData[championChoosed].AS,
                    inline: true,
                  },
                  {
                    name: 'Armor',
                    value: champData[championChoosed].Armor,
                    inline: true,
                  },
                  {
                    name: 'Magic Resist',
                    value: champData[championChoosed].MR,
                    inline: true,
                  },
                ],
              },
            });
          }
          else {
            reactFunc();
          }
        })
        .catch(err => {
          console.error(err);
        });
    };
    reactFunc();
  },
};
