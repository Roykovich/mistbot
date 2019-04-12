const rfr = require('rfr');
const { embed } = rfr('/controllers/warframe/time');

module.exports = {
	name: 'wtime',
	description: 'Shows orbs of vallis warm period and PoE day cycle',
	aliases: ['cetus', 'orbs', 'vallis'],
	usage: [''],
	cooldown: 10,
	execute(message) {
		message.channel.send({ embed });
	},
};