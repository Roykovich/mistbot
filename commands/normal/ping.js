module.exports = {
	name: 'ping',
	description: 'Returns ms',
	aliases: ['pong'],
	usage: '',
	cooldown: 5,
	async execute(message) {
		const pingMessage = await message.channel.send('Ping!');
		pingMessage.edit(`**${pingMessage.createdTimestamp - message.createdTimestamp}ms** pong!`)
			.catch(err => console.error(err));
	},
};