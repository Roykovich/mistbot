/**
 * Bot created to make history
 * Made with ♥ by Roy
 */
const mistCore = require('./allomancyCore/core');

const setup = {
	// Token of the bot
	token: 'TOKEN',
	// Commands prefix
	prefix: 'PREFIX',	
};

const vin = new mistCore(setup);

vin.Init();