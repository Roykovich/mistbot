const Chance = require('chance');
module.exports = {
	name: 'roll',
	description: 'Rolls a dice from 0 to 100',
	aliases: ['dice'],
	usage: [''],
	cooldown: 15,
	execute(message) {
		const chance = new Chance();
		const rolled = chance.integer({ min: 0, max: 100 });
		message.channel.send(`:game_die: = **${rolled}**!`);
	},
};