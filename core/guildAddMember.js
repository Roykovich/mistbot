const exp = module.exports = {};
const snekfetch = require('snekfetch');
const Canvas = require('canvas');
const Discord = require('discord.js');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 140;

	do {
		ctx.font = `${fontSize -= 10}px Helvetica`;
		console.log(fontSize);
	} while (ctx.measureText(text).width > canvas.width - 280);
	return ctx.font;
};

const createCanvas = async (member) => {
	const canvas = Canvas.createCanvas(1024, 1024);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./assets/images/mist_background.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '90px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = 'center';
	ctx.fillText('Welcome to the server', (canvas.width / 2), canvas.height / 2 + 80);

	ctx.font = applyText(canvas, `${member.displayName}`);
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.fillText(`${member.displayName}`, (canvas.width / 2), canvas.height / 2 + 200);

	ctx.beginPath();
	ctx.arc(canvas.width / 2, 280, 200, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, (canvas.width / 2) / 2 + 60, 80, 400, 400);

	const attachment = new Discord.Attachment(canvas.toBuffer(), `welcome-image-${member.displayName}.png`);
	return attachment;
};

exp.createCanvas = createCanvas;