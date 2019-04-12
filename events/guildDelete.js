const fs = require('fs');
const guilds = require('../data/guildsData.json');
module.exports = guild => {
	delete guilds[guild.id];
	fs.writeFile('./data/guildsData.json', JSON.stringify(guilds, null, 2), (err) => {
		if (err) return console.error(err);
	});
};