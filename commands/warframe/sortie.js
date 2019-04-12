const rfr = require('rfr');
const sortie = rfr('/controllers/warframe/sortie');
module.exports = {
	name: 'sortie',
	description: 'Gives you the information of the current sortie.',
	aliases: ['incursion'],
	usage: [''],
	cooldown: 15,
	execute(message) {
		message.channel.send({ embed: sortie.info });
		for (const key in sortie.embed) {
			const embeds = sortie.embed;
			message.channel.send({ embed: embeds[key] });
		}
	},
};