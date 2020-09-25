const { MessageEmbed } = require('discord.js');
const Chance = require('chance');

module.exports = {
	name: 'choose',
	description: 'Allows the bot to choose from an group of choices.',
	aliases: ['decisions', 'elecciones', 'elections'],
	usage: '<choice 1> / <choice 2> / <choice 3> ... <choice n>\n use ( / ) as separator.',
	cooldown: 3,
	execute(message, args) {
		// We declare a new Chance object
		const chance = new Chance();
		// We set our choices separator
		const choices = args.join(' ').split(/ *[|/] */);
		// we sue the pickone method from the Chance object to choose a random
		// choice.
		const res = chance.pickone(choices);
		// Our embed.
		const embed = new MessageEmbed()
			.setColor('#954535')
			.setDescription(`:game_die: **|** I choose: **${res.toUpperCase()}** :eyes:`)
			.setFooter('You can choose whatever you want, don\'t be an idiot.');

		if (choices.length < 2) {
			message.channel.send('Add more choices please.');
		}
		else {
			message.channel.send(`<@!${message.author.id}>`, { embed });
		}
	},
};