const Discord = require('discord.js');
const fs = require('fs');
const rfr = require('rfr');
const { prefix } = rfr('/settings.json');
const guilds = rfr('/data/guildsData.json');
const { autoRes } = rfr('./core/core');

const bot = new Discord.Client();
const cooldowns = new Discord.Collection();
bot.commands = new Discord.Collection();

// How to read the commands in the folder excluding
// the ones that aren't js files
const loadCommands = (path) => {
	const commandFiles = fs.readdirSync(`./commands/${path}/`)
		.filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = rfr(`./commands/${path}/${file}`);
		bot.commands.set(command.name, command);
	}
};

loadCommands('normal');
loadCommands('admin');
loadCommands('own');
loadCommands('apis');
loadCommands('media');

module.exports = async message => {

	// bots can't trigger commands
	if (message.author.bot) return;

	// autoresponses system
	if (!message.content.startsWith(guilds[message.guild.id].prefix || prefix)) {
		autoRes(message, message.content.toLowerCase());
	}
	else {

		// arguments and command name
		const args = message.content.slice(guilds[message.guild.id].prefix.length
			|| prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		// the name of the command from the collection in commandName
		// and their aliases
		const command = bot.commands.get(commandName)
			|| bot.commands.find(cmd => cmd.aliases
				&& cmd.aliases.includes(commandName));

		if (!command) return;

		// cooldown system
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Please wait **${timeLeft.toFixed(1)}s** before using the \`${command.name}\` command.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		// end of the cooldown system

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command!');
		}
	}
};