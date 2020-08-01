const Chance = require('chance');
const chance = new Chance();
const exp = module.exports = {};
const maldiciones = [
	'No maldigas maldito.',
	'¿Por qué tu maldice? No ves que el que maldice se le devuelve la maldición',
	'El que maldice se le devuelve la maldición',
];

exp.autoRes = (message, res) => {
	if (res.match(/(rubén|ruben|reuben|guben|runerd|roy),? (arregla|repara|fixea|bichea|acomoda) [ts]u ((maldit[ao])?|(put[ao])?|(verga)?|(estupid[ao])?)\s?(mierda|vaina|verga|bot|perol|robot)/gi)) {
		message.react('😡').catch((err) => console.error(err));
		message.channel.send('Está ocupado.');
	}
	else if (res.match(/¿?el (socialismo|comunismo|chavismo) funciona\??/gi)) {
		message.channel.send('¿Tú eres marico?');
	}
	else if (res.match(/([Mm]+a+[lr]+d+i+t+[ao]+|m+a+t+i+l+d+o+)/gi)) {
		const maldicion = chance.pickone(maldiciones);
		message.react('😡').catch((err) => console.error(err));
		message.channel.send(maldicion);
	}
	else if (res.match(/(mam[ae]lo|chupa[tm]el[ao])/gi)) {
		message.channel.send('Sacatelo ps');
	}
};