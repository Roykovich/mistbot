const rfr = require('rfr');
const { embed, active } = rfr('/controllers/warframe/baro');
module.exports = {
	name: 'baro',
	description: 'Show the the items that Baro\'s has bring',
	aliases: ['kiteer', 'voidtrader'],
	usage: [''],
	cooldown: 10,
	execute(message) {
		if (active.active) {
			message.channel.send({ embed });
		}
		else {
			message.channel.reply(`Baron isn't here yet, he will come in **${active.start.length <= 26 ? active.start.substr(0, 1) + ' Days.**' : active.start.substr(0, 2) + ' Days.*'}`);
		}
	},
};