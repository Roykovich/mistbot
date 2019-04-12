const fs = require('fs');
const rfr = require('rfr');
const data = rfr('/data/guildsData.json');
module.exports = {
	name: 'prefix',
	description: 'Change the prefix of the bot for your guild.',
	aliases: ['prefijo'],
	usage: [''],
	cooldown: 5,
	execute(message, args) {
		const guildID = message.guild.id;
		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
		};
		const change = () => {
			data[guildID].prefix = args[0];

			const parsed = JSON.stringify(data, null, 2);
			fs.writeFile('./data/guildsData.json', parsed, (err) => {
				if (err) console.log(err);
			});
		};
		const reactFunc = async () => {
			const question = await message.channel.send(`Do you want set your prefix to **${args[0]}**?`);
			// React to the question
			await question.react('👍').then(() => question.react('👎'));
			// Then wait for the user answer
			question.awaitReactions(filter, {
				max: 1,
				time: 15000,
				errors: ['time'],
			})
				.then(collected => {
					// The colecction of reactions
					const reaction = collected.first();
					// What to do with the options
					if (reaction.emoji.name === '👍') {
						message.reply(`Nice then! I had set the prefix to **${args[0]}**`);
						change();
					}
					else {
						message.reply('Ok then.');
					}
				})
				.catch((err) => {
					console.error(err);
					message.reply('React with 👍 or 👎 or maybe pick an option next time.');
				});
		};

		if(args[0]) {
			if(args[0].length > 2) return message.reply('Use only a **2** caracters prefix.');
			else reactFunc();
		}
		else {
			const embed = {
				'description': `guild prefix: **${data[guildID].prefix}**`,
			};
			console.log(embed);
			message.channel.send({ embed }).catch(err => console.error(err));
		}
	},
};