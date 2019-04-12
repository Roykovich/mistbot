module.exports = {
	name: 'purge',
	description: 'Purges at least 100 message from a channel.',
	aliases: [''],
	usage: [''],
	cooldown: 5,
	async execute(message, args) {
		message.delete();
		const amount = parseInt(args[0]);
		if (isNaN(args[0])) return message.reply('Use a number please.');
		if (!amount) return message.reply('You must specify an amount to purge.');
		if (args[0] > 100 && args[0] < 1) return message.reply('I can only delete from 1 message to 100.');
		const fetched = await message.channel.fetchMessage({
			limit: amount,
		});
		message.channel.bulkDelete(fetched).catch(err => console.error(err));
		const msg = await message.channel.send(`Done! Deleted **${args[0]}** messages.`);
		msg.delete();
	},
};