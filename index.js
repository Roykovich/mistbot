/**
 * Mist bot v1.0.0
 * Bot created to make history
 * Made with ♥ by Roy
 */
const Discord = require('discord.js');
const fs = require('fs');
const { token } = require('./settings.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

require('./events/loadEvents')(bot);

const loadCommands = (path)=> {
	const commmandFiles = fs.readdirSync(`./commands/${path}/`).filter(file => file.endsWith('.js'));
	console.log(`- ${commmandFiles.length} ${path} commands has being loaded.`);
};
loadCommands('normal');
loadCommands('admin');
loadCommands('own');
loadCommands('warframe');

bot.login(token);