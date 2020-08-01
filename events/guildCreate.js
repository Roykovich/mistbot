const fs = require('fs');
const guilds = require('../data/guildsData.json');
const { prefix } = require('../settings.json');
const guildData = './data/guildsData.json';
module.exports = guild => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			name: guild.name,
			prefix,
			channels: [],
		};
		console.log(
			`Guild name: ${guild.name} has been added to the database. 
			with the ID: ${guild.id}`
		);
	}
	fs.writeFile(guildData, JSON.stringify(guilds, null, 2), (err) => {
		if (err) return console.error(err);
	});
};