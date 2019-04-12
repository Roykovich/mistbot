const exp = module.exports = {};
const rfr = require('rfr');
const { baro } = rfr('/data/warframeData.json');
const rp = require('request-promise');
const options = {
	uri: 'https://api.warframestat.us/pc/voidTrader',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true,
};

const embed = {
	'author': {
		'name': '',
	},
	'thumbnail': {
		'url': '',
	},
	'description': '```\nHe leaves in: ',
};

const active = {};

rp(options)
	.then(body => {
		if (body.active) {
			embed.author.name += `${body.character} is in: ${body.location}.`;
			embed.thumbnail.url += baro.icon;
			embed.description += body.endString + '```\n\n';
			active.active = body.active;
			active.start = body.startString;
			for(const key in body.inventory) {
				embed.description += `**➕${body.inventory[key].item}**\n➖Ducats: **${body.inventory[key].ducats}**\n➖Credits: **${body.inventory[key].credits}**\n\n`;
			}
		}
		else {
			return;
		}
	})
	.catch(err => console.error(err));

exp.embed = embed;
exp.active = active;