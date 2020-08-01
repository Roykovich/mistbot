module.exports = {
	name: 'avatar',
	description: 'returns your avatar or someone else avatar',
	aliases: ['icon', 'pfp'],
	usage: '[command name] <mention user>(optional)',
	cooldown: 10,
	execute(message, args) {
		// We create an embed object
		const embed = {
			'color': 14576282,
			'image': {},
		};

		// stores the link of the pfp from the mentioned user.
		const toAvatar = message.mentions.users.map(user => {
			return user.displayAvatarURL({ format: 'png', dynamic: true });
		});

		// If there's an argument, we sent the avatar of the mentioned user
		// otherwise, we sent our pfp
		if (args[0]) {
			if (toAvatar) {
				message.channel.send(`<@!${message.author.id}>`);
				for (let i = 0; i < toAvatar.length; i++) {
					embed.image.url = toAvatar[i];
					embed.description = `${args[i]} avatar:`;
					message.channel.send({ embed }).catch(error => console.err(error.stack));
				}
			}
			else {
				message.reply('Mention an user!');
			}
		}
		else {
			embed.description = 'Your avatar:';
			embed.image.url = message.author.displayAvatarURL({ format: 'png', dynamic: true });
			message.channel.send(`<@!${message.author.id}>`, { embed }).catch(error => console.err(error.stack));
		}
	},
};