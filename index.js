/**
 * Mist bot v1.1.0
 * Bot created to make history
 * in my Discord server ofc
 * Made with ♥ by Roy
 */

/**  --Main Module--
 * Here's where the bot loads all the modules of
 * the events and commands.
  */

const Discord = require('discord.js');
const fs = require('fs');
const rfr = require('rfr');
const { token } = require('./settings.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

require('./events/loadEvents')(bot);

const loadCommands = (path) => {
	const commandFiles = fs.readdirSync(`./commands/${path}/`)
		.filter(file => file.endsWith('.js'));
	console.log(`- ${commandFiles.length} ${path} commands has being loaded.`);
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

bot.login(token);