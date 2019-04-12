module.exports = {
	name: 'avatar',
	description: 'returns your avatar or someone else avatar',
	aliases: ['icon', 'pfp'],
	usage: [''],
	cooldown: 10,
	execute(message, args) {
		const toAvatar = message.mentions.members.first() || message.guild.members.get(args[0]);

		const embed = {
			'author': {
				'name': message.author.username,
				'icon_url': message.author.avatarUrl,
			},
			'color': 14576282,
			'image': {},
		};

		if (args[0]) {
			if(toAvatar) {
				embed.image.url = toAvatar.user.avatarURL;
				embed.description = `<@!${toAvatar.id}> avatar:`;
				message.channel.send(`<@!${message.author.id}>`, { embed }).catch(error => console.err(error.stack));
			}
			else {
				message.reply('Mention an user!');
			}
		}
		else {
			embed.description = 'Your avatar:';
			embed.image.url = message.author.avatarURL;
			message.channel.send(`<@!${message.author.id}>`, { embed }).catch(error => console.err(error.stack));
		}
	},
};