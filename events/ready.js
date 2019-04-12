const { game } = require('../core/core');
module.exports = bot => {
	console.log(`\nBot up and running in ${bot.guilds.size} servers!`);
	setInterval(() => {
		bot.user.setActivity(`${game.cetus} | ${game.baro}`, { type: 'WATCHING' });
	}, 60 * 1000);
};