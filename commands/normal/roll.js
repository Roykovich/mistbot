const Chance = require('chance');
module.exports = {
	name: 'roll',
	description: 'Rolls a dice from 0 to 100 or 1 to your number (maximum 1000)',
	aliases: ['dice'],
	usage: '[command name] <number>(optional)',
	cooldown: 3,
	execute(message, args) {
		const chance = new Chance();
		const rolled = chance.integer({ min: 0, max: 100 });
		const customRolled = chance.integer({ min: 1, max: args[0] });

		// Checks if the argument exists
		if (args[0]) {
			// Checks if the argument given is not a number
			if (isNaN(args[0])) {
				message.reply('type a number not something else.');
			}
			else if (args[0] > 1000 || args[0] < 1) {
				message.reply('type a number that is more than 1 and less or equal than 1000')
			}
			else {
				message.channel.send(`<@!${message.author.id}> rolled **${customRolled}** of ${args[0]}`);
			}
		}
		else {
			message.channel.send(`<@!${message.author.id}> rolled **${rolled}** of 100`);
		}
	},
};