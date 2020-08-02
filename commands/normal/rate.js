const Chance = require('chance');
module.exports = {
	name: 'rate',
	description: 'Rates something',
	aliases: ['ratea'],
	usage: '<something to rate>',
	cooldown: 5,
	execute(message, args) {
		// Everything here is self-explicative

		// We create a new Chance Object.
		const chance = new Chance();
		// We choose a random integer from 0 to 10
		const rate = chance.integer({ min: 0, max: 10 });
		const embed = {
			'color': 12738172,
			'description': `Hmmm... \`${args.join(' ')}\`: **${rate}/10.**`,
		};

		if (!args[0]) {
			message.channel.send('Give me something to rate.');
		}
		else {
			message.channel.send({ embed });
		}
	},
};