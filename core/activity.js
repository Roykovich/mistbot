const rp = require('request-promise');
const exp = module.exports = {};

const cetus = {
	uri: 'https://api.warframestat.us/pc/cetusCycle',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true,
};

const baro = {
	uri: 'https://api.warframestat.us/pc/voidTrader',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true,
};

const activity = {
	baro: '',
	cetus: '',
};

rp(cetus)
	.then((body) => {
		setInterval(() => {
			if(body.isDay === true) {
				activity.cetus = `${body.timeLeft} to Night`;
			}
			else {
				activity.cetus = `${body.timeLeft } to Day`;
			}
		}, 60000);
	})
	.catch((err) => {
		console.error(err);
	});

rp(baro)
	.then((body) => {
		if(body.active === false) {
			if (activity.baro.length <= 26) {
				activity.baro = `Baro will come in ${body.startString.substr(0, 1)} days.`;
			}
			else {
				activity.baro = `Baro will come in ${body.startString.substr(0, 2)} days.`;
			}
		}
		else {
			activity.baro = `Baro is here! He will leave in ${body.endString.substr(0, 1)} days.`;
		}
	})
	.catch((err) => {
		console.error(err);
	});

exp.game = activity;