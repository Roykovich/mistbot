module.exports = bot => {
	console.log('\nBot up and running!');

	// const guild = bot.guilds.cache.get('588977362234900490');
	// const channel = guild.channels.cache.get('688862805339930663');
	bot.user.setActivity('What\'s my purpose?', { type: 'WATCHING' });


	/**
	 * Repeat message mechanism
	 */

	// if (guild) {
	// 	if (channel) {
	// 		setInterval(() => {
	// 			channel.send('Esto funciona');
	// 		}, 10 * 5000);
	// 	}
	// }
	// else {
	// 	console.log('Theres');
	// }

};