const reqEvent = (event) => require(`./${event}`);
module.exports = bot => {
	bot.on('ready', () => reqEvent('ready')(bot));
	bot.on('guildCreate', (guild) => reqEvent('guildCreate')(guild));
	bot.on('guildDelete', (guild) => reqEvent('guildDelete')(guild));
	bot.on('guildMemberAdd', async (member) => reqEvent('guildMemberAdd')(member));
	// bot.on('message', async (message) => reqEvent('message')(message));
};