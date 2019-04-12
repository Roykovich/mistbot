const Chance = require('chance');
module.exports = {
	name: 'rate',
	description: 'Rates something',
	aliases: [''],
	usage: [''],
	cooldown: 5,
	execute(message, args) {
		const chance = new Chance();
		const rate = chance.integer({ min: 0, max: 10 });
		const embed = {
			'color': 12738172,
			'description': `Hmmm... \`${args.join(' ')}\`... **${rate}/10.**`,
		};

		if(!args[0]) {
			message.channel.send('Give me something to rate.');
		}
		else {
			message.channel.send(embed);
		}
	},
};