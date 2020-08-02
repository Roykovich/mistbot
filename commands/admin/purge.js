module.exports = {
	name: 'purge',
	description: 'Purges at least 1 message from a channel.',
	aliases: ['purgar'],
	usage: '<amount of messages>',
	cooldown: 5,
	async execute(message, args) {
		// I should comment this module but almost everything is self-explicative

		// It deletes the message where the user calls the purge command.
		message.delete({ timeout: 3000 });

		// Parse the amount to an integer to avoid errors.
		const amount = parseInt(args[0]);

		if (isNaN(args[0])) return message.reply('Use a number please.');
		if (!amount) return message.reply('You must specify an amount to purge.');
		if (args[0] > 100 || args[0] < 1) return message.reply('I can only delete from 1 message to 100 messages.');

		message.channel.bulkDelete(amount).catch(err => console.error(err));

		const msg = await message.channel.send(`Done! Deleted **${amount}** messages.`);
		msg.delete({ timeout: 5000 });
	},
};