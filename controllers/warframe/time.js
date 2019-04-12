const exp = module.exports = {};
const rp = require('request-promise');

const eidolon = {
	uri: 'https://api.warframestat.us/pc/cetusCycle',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true,
};

const orbs = {
	uri: 'https://api.warframestat.us/pc/vallisCycle',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true,
};

const embed = {
	'author': {
		'name': 'PoE/Vallis Cyles',
	},
	'description': '',
};

// eslint-disable-next-line no-undef
rp(eidolon)
	.then(body => {
		embed.description += `Plains of Eidolon: **${body.timeLeft}** to ${body.isDay ? ' night 🌕' : ' day ☀'}.\n\n`;
	})
	.catch(err => console.error(err));

// eslint-disable-next-line no-undef
rp(orbs)
	.then(body => {
		embed.description += `Orbs of Vallis: **${body.timeLeft}** to ${body.isWarm ? ' cold ❄' : ' warm 🔥'}.`;
	})
	.catch(err => console.error(err));

exp.embed = embed;