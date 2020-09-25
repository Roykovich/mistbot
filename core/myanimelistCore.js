/* eslint-disable no-undef */
/* eslint-disable indent */
const { MessageEmbed } = require('discord.js');
const exp = module.exports = {};
const rp = require('request-promise');
const rfr = require('rfr');
const { animeGenres, errors } = rfr('./data/mal.json');
const Chance = require('chance');
const chance = new Chance();

const API_URL = 'https://api.jikan.moe/v3';
const MAL_URL = 'https://myanimelist.net';
const MAL_ICON = 'https://cdn.discordapp.com/attachments/731987400863252502/742666095109996634/favicon.png';
const LETTERS = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮'];
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
/** TODO
 * 4 - https://api.jikan.moe/v3/top/anime/1/upcoming   <---- top upcoming shit.
 * 6 - topshit
 * 7 - profile
 */


const options = {
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
};

// -----------------------------------------------------
// Functions no-related with fetching from the API but |
// to help with them.                                  |
// -----------------------------------------------------

const genrenator = genres => {
  const result = [];
  for (const genre of genres) {
    result.push(genre.name);
  }
  return result.join(', ');
};

const itemCountToPage = itemCount => {
  if (itemCount < 100) return 1;
  const pages = (itemCount / 100) % 1 !== 0
    ? Math.floor((itemCount / 100) + 1)
    : itemCount / 100;

  return pages;
};

const genreParser = genre => {
  if (genre.length < 3 && genre.length >= 1) {
    const id = parseInt(genre);
    return id < 43 && id > 0 ? id : false;
  }
  else {
    return animeGenres.hasOwnProperty(genre) ? animeGenres[genre] : false;
  }
};

const embedCreator = anime => {
  const embed = new MessageEmbed()
    .setColor('#2E51A2')
    .setTitle(`${anime.title} (${anime.title_japanese})`)
    .setURL(anime.url.replace('\\', ''))
    .setDescription(anime.synopsis.split(/\[Written by MAL Rewrite\]/)[0])
    .setImage(anime.image_url.replace('\\', ''))
    .setAuthor('MyAnimeList', MAL_ICON, MAL_URL)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Type', value: anime.type, inline: true,
      },
      {
        name: 'Source', value: anime.source, inline: true,
      },
      {
        name: 'Episodes', value: anime.episodes, inline: true,
      },
      {
        name: 'Status', value: `${anime.status}.\n Aired ${anime.aired.string}`,
        inline: true,
      },
      {
        name: 'Genres', value: `${genrenator(anime.genres)}.`, inline: true,
      },
      {
        name: 'Rating', value: anime.rating, inline: true,
      },
    );
  return embed;
};

const errorEmbedCreator = statusCode => {
  const error = statusCode.toString();
  const errorMessage = errors[error];
  const embed = new MessageEmbed()
    .setAuthor('MyAnimeList', MAL_ICON, MAL_URL)
    .setColor('#2E51A2')
    .setDescription(errorMessage);

  return embed;
};

// -----------------------------------------------------
// Functions that actually fetch info from the API     |
// -----------------------------------------------------

const searchByID = async id => {
  let anime;

  await rp(`${API_URL}/anime/${id}`, options)
    .then(animeInfo => {
      anime = animeInfo;
    })
    .catch(err => {
      console.error(err.error);
    });

  return anime;
};

const searcher = async (animeName, anime = true) => {
  const results = [];

  const link = anime ? `${API_URL}/search/anime?q=${animeName}` :
    `${API_URL}/search/manga?q=${animeName}`;

  await rp(link, options)
    .then((body) => {
      const arrayLength = body.results.length > 9 ? 9 : body.results.length;
      for (let i = 0; i < arrayLength; i++) {
        results.push({
          title: body.results[i].title,
          url: body.results[i].url,
          image_url: body.results[i].image_url,
          synopsis: body.results[i].synopsis,
          type: body.results[i].type,
          score: body.results[i].score,
        });

        if (anime) {
          results[i].episodes = body.results[i].episodes;
        }
        else {
          results[i].chapters = body.results[i].chapters;
          results[i].volumes = body.results[i].volumes;
        }
      }
    })
    .catch((err) => {
      console.error(err.error);
      return errorEmbedCreator(err.status);
    });
  return results;
};

const animeSearch = async (message, name, anime = true) => {
  // Filter for the reactions and the user.
  const filter = (reaction, user) => {
    return [...LETTERS, '❌']
      .includes(reaction.emoji.name) && user.id === message.author.id;
  };

  // We make a call to get an array of anime objects
  const results = await searcher(name, anime);

  // Embed.
  const embed = {
    author: {
      name: 'MyAnimeList', url: MAL_URL, icon_url: MAL_ICON,
    },
    color: 3035554,
    description: '',
  };

  // For loop with await to
  const addToDescription = () => {
    for (let i = 0; i < results.length; i++) {
      embed.description += `${LETTERS[i]}** - ${results[i].title}**\n`;
    }
  };

  await addToDescription();

  // We make a function that handle all the reactions.
  const reactFunc = async () => {
    // We sent an embed containin all the results
    const setOfAnimes = await message.channel.send({ embed });

    // We start reacting to the embed
    try {
      for (i in results) {
        await setOfAnimes.react(LETTERS[i]);
      }
    }
    catch (err) {
      console.error(err);
    }

    // We use an ❌ to say that the anime/manga we are looking for is not
    // in the list
    await setOfAnimes.react('❌');

    // We handle the reactions with awaitReactions and we wait for the user
    // to react just one time and with the set of the available reactions.
    setOfAnimes.awaitReactions(filter, {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
      .then(collected => {
        const reaction = collected.first();
        const emoji = reaction.emoji.name;
        const index = LETTERS.indexOf(emoji);

        if (emoji === '❌') return message.channel.send('Welp I can\'t find the anime you are looking for :(');

        if (index != -1) {
          const currentAnime = results[index];

          message.channel.send({
            embed: {
              author: {
                name: 'MyAnimeList', url: MAL_URL, icon_url: MAL_ICON,
              },
              color: 3035554,
              title: `${currentAnime.title}`,
              url: currentAnime.url,
              description: currentAnime.synopsis,
              thumbnail: { url: currentAnime.image_url },
              fields: [
                {
                  name: anime ? 'episodes' : 'volumes',
                  value: anime ? currentAnime.episodes :
                    `${currentAnime.volumes} (${currentAnime.chapters} chapters)`,
                  inline: true,
                },
                { name: 'score', value: currentAnime.score, inline: true },
                { name: 'type', value: currentAnime.type, inline: true },
              ],
            },
          });
        }
        else {
          message.channel.send('Welp something happened');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  reactFunc();
};

const searchAnimeByGender = async genre => {
  const genreID = genreParser(genre);

  if (!genreID) {
    return errorEmbedCreator(400);
  }

  // First we parse the pages thanks to the amount of anime with the genre.
  const pages = await rp(`${API_URL}/genre/anime/${genreID}`, options)
    .then(body => {
      return itemCountToPage(body.item_count);
    })
    .catch(err => {
      console.error(err.error);
      return errorEmbedCreator(err.status);
    });

  const randomPage = chance.integer({ min: 1, max: pages });
  const animeID =
    await rp(`${API_URL}/genre/anime/${genreID}/${randomPage}`, options)
      .then((body) => {
        return chance.pickone(body.anime).mal_id;
      })
      .catch((err) => {
        console.error(err.error);
        return errorEmbedCreator(err.status);
      });

  const anime = await searchByID(animeID);
  return embedCreator(anime);
};

const scheduler = async (message, day = '') => {
  const resultByDay = [];
  const resultByWeek = [];
  const embeds = [];
  let currentAnimeArray = [];

  await rp(`https://api.jikan.moe/v3/schedule/${day}`, options)
    .then(body => {
      // If the user give a day to search for we only loop through all the array
      // of that specific day.
      if (day) {
        for (anime of body[day]) {
          resultByDay.push({
            title: anime.title,
            url: anime.url,
          });
        }
      }
      else {
        for (currentDay of DAYS) {
          // Since the descriptions of Discord embeds has a limit of 2048 chars
          // per description, we check if they are more than 10 animes, if that
          // so we use only 10 animes. Otherwise we use the current amount of
          // that day.
          const animeAmount = body[currentDay].length > 10 ?
            10 : body[currentDay].length;

          for (let i = 0; i < animeAmount; i++) {
            const currentAnime = body[currentDay][i];

            // We store the anime object in an array and then we push that array
            // into the resulyByWeek array.
            currentAnimeArray.push(
              {
                title: currentAnime.title,
                url: currentAnime.url,
              }
            );
          }

          // Here's the push to the resultByWeek array and then we "clean" the
          // array we just pushed to start adding the animes of the next day.
          resultByWeek.push(currentAnimeArray);
          currentAnimeArray = [];
        }
      }
    })
    .catch(err => {
      console.error(err);
    });

  // Good embed.
  const embed = {
    author: {
      name: 'MyAnimeList', url: MAL_URL, icon_url: MAL_ICON,
    },
    color: 3035554,
    description: '',
  };

  // A function self-explicative by its name. Works to loop through the animes
  // array depending on if the user has passed a day or not and then add that
  // anime with its url to the embed description.
  const addToDescription = async () => {
    if (day) {
      embed.title = `${day[0].toUpperCase() + day.substring(1)} animes:`;
      for (anime of resultByDay) {
        embed.description += `- [${anime.title}](${anime.url})\n`;
      }
    }
    else {
      for (let i = 0; i < DAYS.length; i++) {
        embed.title =
          `${DAYS[i][0].toUpperCase() + DAYS[i].substring(1)} animes:`;
        embed.description = '';
        for (anime of resultByWeek[i]) {
          embed.description += `- [${anime.title}](${anime.url})\n`;
        }
        embeds.push({ ...embed });
      }
    }
  };

  await addToDescription();

  if (!day) {
    message.channel.send(`<@!${message.author.id}>`);
    for (let i = 0; i < embeds.length; i++) {
      message.channel.send({ embed: embeds[i] })
        .catch(err => console.error(err.stack));
    }
  }
  else {
    return message.reply({ embed });
  }
};

exp.animeSearch = animeSearch;
exp.searchAnimeByGender = searchAnimeByGender;
exp.scheduler = scheduler;