const exp = module.exports = {};
const rfr = require('rfr');
const Discord = require('discord.js');
// const bot = new Discord.client({disableEveryone: true});
const rp = require('request-promise');
const io = require('socket.io');
let options = {
  uri: 'https://api.warframestat.us/pc/voidTrader',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
}

exp.meme = async () =>{
  rp(options)
      .then((body) => {
      })
      .catch((err) => {
        console.err(err);
      });
}
