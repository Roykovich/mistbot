/**
 * Base of the commands
 */

class MistCommand {
  constructor(core) {
    this.core = core;
    this.bot = core.bot

    this.commandName = '';
    this.commandDescription = '';
  }
}

module.exports = MistCommand;