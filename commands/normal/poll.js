/* eslint-disable no-undef */
module.exports = {
	name: 'poll',
	description: 'A simple poll embed. It covers 1 to 10 options.',
	aliases: ['survey', 'votacion'],
	usage: '<question> / <option 1> / <option 2> / <option 3> ... <option 10>',
	cooldown: 60,
	async execute(message, args) {
		const options = args.join(' ').split(/ *[|/-] */);
		const letters = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯'];
		if (options.length <= 2) return message.reply('Add more choices please!');
		if (options.length > 11) return message.reply('You added to much choices, please use the maximun: **10**');

		message.delete({ timeout: 1000 });

		// We create an object with the current question and an array of options
		const poll = {
			question: options[0],
			options: options.slice(1),
		};

		const embed = {
			'author': {
				'name': poll.question,
			},
			'description': '',
			'color': 12873817,
		};

		//	We loop through every option and add one by one to the embed description
		for (i in poll.options) {
			embed.description += `${letters[i]}** - ${poll.options[i]}**\n`;
		}

		// The bot sent the message to the channel where we called the poll command
		const msg = await message.channel.send(`@everyone Heeeeey!\n<@!${message.author.id}> has started a poll: **${options[0]}**`, { embed });

		// And after that we react to the message we sent before to make
		// a system where the users can vote.
		try {
			for (i in poll.options) {
				await msg.react(letters[i]);
			}
		}
		catch (err) {
			console.error(err);
		}
	},
};