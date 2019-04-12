const heart = [
	':heart:',
	':yellow_heart:',
	':green_heart:',
	':blue_heart:',
	':purple_heart:',
];

module.exports = {
	name: 'f',
	description: 'press f to pay respects',
	aliases: ['efe'],
	usage: [''],
	cooldown: 5,
	execute(message, args) {
		const toRespect = message.mentions.members.first() || message.guild.members.get(args[0]);
		const randomHeart = heart[Math.floor(Math.random() * heart.length)];
		const f = {
			'color': 14576282,
			'footer': {
				'text': 'Press F to pay respects too.',
			},
		};

		if (args[0]) {
			if (toRespect) {
				f.description = `${message.author.username} has paid their respects to <@!${toRespect.id}> ${randomHeart}`;
				message.channel.send({ embed: f });
			}
			else {
				f.description = `${message.author.username} has paid their respects to **${args[0]}** ${randomHeart}`;
				message.channel.send({ embed: f });
			}
		}
		else {
			f.description = `${message.author.username} has paid their respects ${randomHeart}`;
			message.channel.send({ embed: f });
		}
	},
};