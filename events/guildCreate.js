const fs = require('fs');
const guilds = require('../data/guildsData.json');
const { prefix } = require('../settings.json');
module.exports = guild => {
	if(!guilds[guild.id]) {
		guilds[guild.id] = {
			name: guild.name,
			prefix,
			channels: [],
		};
	}
	fs.writeFile('./data/guildsData.json', JSON.stringify(guilds, null, 2), (err) => {
		if (err) return console.error(err);
	});
};