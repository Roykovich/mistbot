// const { createCanvas } = require('../core/core');
module.exports = member => {
	const channel = member.guild.channels.cache
		.find(ch => ch.name === 'hablación');

	if (!channel) return;

	channel.send(`Welcome to the server!, ${member}!`);
};