const Discord = require('discord.js');
const Chance = require('chance');

module.exports = {
	name: 'choose',
	description: 'make decisions',
	aliases: ['decisions'],
	usage: [''],
	cooldown: 3,
	execute(message, args) {
		const chance = new Chance();
		const choices = args.join(' ').split(' / ');
		const res = chance.pickone(choices);
		const embed = new Discord.RichEmbed()
			.setColor('#954535')
			.setDescription(`:game_die: **|** I choose: **${res.toUpperCase()}** :eyes:`)
			.setFooter('You can choose whatever you want, don\'t be stupid.');

		if (choices.length < 2) {
			message.channel.send('Add more choices please.');
		}
		else {
			message.channel.send(`<@!${message.author.id}>`, { embed });
		}
	},
};