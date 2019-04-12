module.exports = {
	name: 'temp',
	description: 'Temperature converter',
	aliases: ['temperature'],
	usage: [''],
	cooldown: 5,
	execute(message, args) {
		// const unitOne = args[0].toLowerCase();
		// const unitTwo = args[1].toLowerCase();
		// const temperature = args[2];

		// const embed = {
		// 	'description': 'Here you are:',
		// 	'fields': [
		// 		{ 'name': `${unitOne.toUpperCase()}°`, 'value': temperature, 'inline': true },
		// 		{ 'name': `${unitTwo.toUpperCase()}°`, 'value': '', 'inline': true },
		// 	],
		// };
		// let result = '';

		// if(typeof unitOne !== 'string' || typeof unitTwo !== 'string' || isNaN(temperature)) {
		// 	message.channel.send('Use the command this way: `shi!temp <the unit you want to convert> <Unit to which you want to convert> <the amount>` the units are `C | K | F`.');
		// }
		// else if (unitOne === 'k' && unitTwo === 'f') {
		// 	result = (temperature - 273.15) * (9 / 5) + 32;
		// }
		// else if (unitOne === 'k' && unitTwo === 'c') {
		// 	result = temperature - 273.15;
		// }
		// else if (unitOne === 'f' && unitTwo === 'c') {
		// 	result = (temperature - 32) * (5 / 9);
		// }
		// else if (unitOne === 'f' && unitTwo === 'k') {
		// 	result = ((temperature - 32) * (5 / 9)) + 273.15;
		// }
		// else if (unitOne === 'c' && unitTwo === 'k') {
		// 	result = parseInt(temperature) + 273.15;
		// }
		// else if (unitOne === 'c' && unitTwo === 'f') {
		// 	result = ((9 / 5) * parseInt(temperature)) + 32;
		// }
		// embed.fields[1].value = `${result.toFixed(2)}`;
		// message.channel.send(`<@!${message.author.id}>`, { embed });
		message.channel.send('WIP');
	},
};