const { createCanvas } = require('../core/core');
module.exports = member => {
	const channel = member.guild.channels.find(ch => ch.name === 'general');
	if (!channel) return;

	const attachment = createCanvas(member);
	channel.send(`Welcome to the server puto, ${member}!`, attachment);
};