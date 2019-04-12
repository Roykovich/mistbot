const exp = module.exports = {};

exp.autoRes = (message, res) => {
	if (res.match(/(ruben|reuben|guben|runerd|roy),? (arregla|repara|fixea|bichea|acomoda) [ts]u (mierda|vaina|verga|bot|perol)/gi)) {
		message.react('😡').catch((err) => console.error(err));
		message.channel.send('Está ocupado.');
	}
	else if (res.match(/el socialismo funciona?/gi)) {
		message.channel.send('¿Tú eres marico?');
	}
};
