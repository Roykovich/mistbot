const exp = module.exports = {};
const { autoRes } = require('./messages');
const { game } = require('./activity');
const { createCanvas } = require('./guildAddMember');

exp.autoRes = autoRes;
exp.game = game;
exp.createCanvas = createCanvas;
