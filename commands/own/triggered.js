/* eslint-disable no-inline-comments */
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const GIF = require('gif.js');

module.exports = {
	name: 'triggered',
	description: 'Makes you look triggered',
	aliases: ['trigger', 'engatillao'],
	usage: [''],
	cooldown: 30,
	async execute(message, args) {
		const toTrigger = message.mentions.members.first() || message.guild.members.get(args[0]);
		
		const num_frames = 20;

		const canvas = Canvas.createCanvas(700, 700);
		const ctx = canvas.getContext('2d');

		const gif = new GIF({
			workers: 4,
			quality: 10,
		});

		// const gifizer = () => {

		// };

		if (args[0]) {
			const { body: buffer } = await snekfetch.get(toTrigger.user.displayAvatarURL);
			const avatar = await Canvas.loadImage(buffer);
			ctx.drawImage(avatar, 0, 0, 700, 500);
			grayScale(ctx, canvas);
		}
		else {
			const { body: buffer } = await snekfetch.get(message.author.displayAvatarURL);
			const avatar = await Canvas.loadImage(buffer);
			ctx.drawImage(avatar, 0, 0, 700, 500);
			grayScale(ctx, canvas);
		}

		const trigger = await Canvas.loadImage('./images/triggered.png');
		ctx.drawImage(trigger, 0, 500, 700, 200);
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'triggered.png');
		message.channel.send(attachment);
	},
};