/**
 * Mistbot v2.0.0
 * 
 * Allomancy at its finest
 */

const Discord = require('discord.js');

class MistCore  {
  constructor(settings) {
    this.version = '2.0';
    this.enabled = true;
    this.settings = settings;
    this.bot = new Discord.Client();
    this.bot.on('ready', () => this.burnUp());
    this.bot.on('disconnected', () => this.Init());
  }

  Init() {
    this.bot.login(this.settings.token);
  }

  burnUp() {
    console.log(`\nBot up and running in ${this.bot.guilds.size} servers!`);
  }

}

module.exports = MistCore;