/* eslint-disable no-undef */
module.exports = {
	name: 'poll',
	description: 'Strawpoll are you?',
	aliases: ['survey'],
	usage: [''],
	cooldown: 60,
	async execute(message, args) {
		const options = args.join(' ').split(' | ');
		const letters = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯'];
		if (options.length <= 2) return message.reply('Add more choices please!');
		if (options.length > 11) return message.reply('You added to much choices, please use the maximun: **10**');
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
		for (i in poll.options) {
			embed.description += `${letters[i]}** - ${poll.options[i]}**\n`;
		}
		const msg = await message.channel.send(`<@!${message.author.id}> has started a poll: **${options[0]}**`, { embed });
		try {
			for (i in poll.options) {
				await msg.react(letters[i]);
			}
		}
		catch(err) {
			console.error(err);
		}
	},
};