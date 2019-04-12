const rp = require('request-promise');
const rfr = require('rfr');
const exp = module.exports = {};
const {
	planets,
	sortie_bosses,
	factions,
} = rfr('./data/warframeData.json');

const options = {
	uri: 'https://api.warframestat.us/pc/sortie',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true,
};

const embeds = [{
	'author': {
		'name': '',
	},
	'description': '',
	'color': 8311585,
	'thumbnail': {
		'url': '',
	},
	'fields': [],
},
{
	'author': {
		'name': '',
	},
	'description': '',
	'color': 8311585,
	'thumbnail': {
		'url': '',
	},
	'fields': [],
},
{
	'author': {
		'name': '',
	},
	'footer': {
		'text' : '',
		'icon_url': '',
	},
	'description': '',
	'color': 8311585,
	'thumbnail': {
		'url': '',
	},
	'fields': [],
},
];

const info = {
	'author': {
		'name': '',
	},
	'description': '',
	'color': 8311585,
	'image': {
		'url': '',
	},
};

const arryFy = (str) => str.trim().split(' ');

rp(options)
	.then((body) => {

		for (const key in body.variants) {
			embeds[key].author.name += body.variants[key].node;
			embeds[key].fields.push({
				'name': 'Mission Type:',
				'value': body.variants[key].missionType,
				'inline': true,
			});
			embeds[key].fields.push({
				'name': body.variants[key].modifier,
				'value': body.variants[key].modifierDescription,
				'inline': true,
			});
			// The regex for parentheses
			const regExp = /\(([^)]+)\)/;
			// planet[1] is the value between parentheses
			const planet = regExp.exec(arryFy(body.variants[key].node));
			switch (planet[1]) {
			case 'Mercury':
				embeds[key].thumbnail.url += planets.mercury;
				break;
			case 'Venus':
				embeds[key].thumbnail.url += planets.venus;
				break;
			case 'Earth':
				embeds[key].thumbnail.url += planets.earth;
				break;
			case 'Mars':
				embeds[key].thumbnail.url += planets.mars;
				break;
			case 'Phobos':
				embeds[key].thumbnail.url += planets.phobos;
				break;
			case 'Ceres':
				embeds[key].thumbnail.url += planets.ceres;
				break;
			case 'Jupiter':
				embeds[key].thumbnail.url += planets.jupiter;
				break;
			case 'Europa':
				embeds[key].thumbnail.url += planets.europa;
				break;
			case 'Saturn':
				embeds[key].thumbnail.url += planets.saturn;
				break;
			case 'Uranus':
				embeds[key].thumbnail.url += planets.uranus;
				break;
			case 'Neptune':
				embeds[key].thumbnail.url += planets.neptune;
				break;
			case 'Pluto':
				embeds[key].thumbnail.url += planets.pluto;
				break;
			case 'Sedna':
				embeds[key].thumbnail.url += planets.sedna;
				break;
			case 'Eris':
				embeds[key].thumbnail.url += planets.eris;
				break;
			case 'Void':
				embeds[key].thumbnail.url += planets.void;
				break;
			case 'Derelict':
				embeds[key].thumbnail.url += planets.derelict;
				break;
			case 'Lua':
				embeds[key].thumbnail.url += planets.lua;
				break;
			case 'Kuva Fortress':
				embeds[key].thumbnail.url += planets.kuva_fortress;
				break;
			}

			switch(body.faction) {
			case 'Grineer':
				embeds[key].author.icon_url = factions.grineer;
				info.author.icon_url = factions.grineer;
				break;
			case 'Corpus':
				embeds[key].author.icon_url = factions.corpus;
				info.author.icon_url = factions.corpus;
				break;
			case 'Infestation':
				embeds[key].author.icon_url = factions.infested;
				info.author.icon_url = factions.infested;
				break;
			case 'Orokin':
				embeds[key].author.icon_url = factions.orokin;
				info.author.icon_url = factions.orokin;
				break;
			}
			if(key == body.variants.length - 1) {
				embeds[key].footer.text += 'Made with ♥ by Roy. Powered by memes.';
				embeds[key].footer.icon_url += 'https://cdn.discordapp.com/attachments/527697071839510549/557781455640461323/vector_cosmico.png';
			}
		}
		// end For loop

		switch (body.boss) {
		case 'Hyena Pack':
			info.image.url += sortie_bosses.hyena;
			break;
		case 'Kela De Thaym':
			info.image.url += sortie_bosses.kela;
			break;
		case 'Vor':
			info.image.url += sortie_bosses.vor;
			break;
		case 'General Sargas Ruk':
			info.image.url += sortie_bosses.ruk;
			break;
		case 'Councilor Vay Hek':
			info.image.url += sortie_bosses.hek;
			break;
		case 'Lech Kril':
			info.image.url += sortie_bosses.kril;
			break;
		case 'Tyl Regor':
			info.image.url += sortie_bosses.tyl;
			break;
		case 'Jackal':
			info.image.url += sortie_bosses.jackal;
			break;
		case 'Alad V':
			info.image.url += sortie_bosses.alad;
			break;
		case 'Mutalist Alad V':
			info.image.url += sortie_bosses.mutalist_alad;
			break;
		case 'Ambulas':
			info.image.url += sortie_bosses.ambulas;
			break;
		case 'Nef':
			info.image.url += sortie_bosses.nef;
			break;
		case 'Raptor':
			info.image.url += sortie_bosses.raptor;
			break;
		case 'Phorid':
			info.image.url += sortie_bosses.phorid;
			break;
		case 'Lephantis':
			info.image.url += sortie_bosses.lephantis;
			break;
		case 'Infalad':
			info.image.url += sortie_bosses.infalad;
			break;
		case 'Corrupted Vor':
			info.image.url += sortie_bosses.corrupted_vor;
			break;
		}

		info.author.name += `Today Sortie Boss: ${body.boss} (${body.faction})`;
		info.description += `Expires in: **${body.eta}**`;
	})
	.catch((err) => {
		console.error(err);
	});

exp.info = info;
exp.embed = embeds;