/**
 * commands manager
 */

class MistCommands {
  constructor(core) {
    this.prefix = core.settings.prefix;
    this.bot = core.bot;
    this.commands = {};
    this.commandsPlain = {};
  }

  registerCommand(commandNames, description, options, func) {
    let command = {};
    command.name = (!!commandNames.splice) ? commandNames(0, 1)[0] : commandNames;
    if(typeof command.name != 'string') return false;

    // Description of the command
    command.description = description;
    // Admin only command
    command.admindOnly = options.admindOnly || false;
    // if its defined it args parameter will be separated with the character defined.
    command.argSeparator = options.argSeparator;
    // if its define it will show the argComponents elements in the help
    if (options.argComponents) {
      command.argComponent = " " + options.argComponents.join(" ");
    } 
    else {
      command.argComponent = "";
    }

    command.exec = func;

    this.commands[command.name] = command;
    this.commandsPlain[command.name] = command;

    for(const altName of command.aliases) {
      this.commandsPlain[altName] = command;
    }

    return true;
  }

  unregisterCommand(commandName) {
    if (this.commands[commandName]) {
      for(const altName of this.commands[commandName].aliases) {
        delete this.commandsPlain[altName];
      }
      delete this.commandsPlain[commandName];

      return delete this.commands[commandName];
    }
    else {
      return false;
    }
  }

  processMessage(msg) {
    const p = this.prefix.length;
    if(msg.content.substr(0, p) != this.prefix) return 'notcommand';
    let result = this.execCommand(msg);
    switch(result) {
      case 'permdenied':
        this.bot.reply(msg, 'You aren\'t allowed to do that.');
        return result;
      default: 
        return result;
    }
  }

  execCommand(msg) {
    const p = this.prefix.length;
    const args = msg.cleanContent.substr(p).split(' ');
    const commandName = args.splice(0, 1)[0];

    if(!this.commandsPlain[commandName]) return 'notcommand';
    const command = this.commandsPlain[commandName];

    args = args.join(' ');
    if (command.argSeparator) {
      args = args.split(command.argSeparator);
    }

    try {
      command.exec(msg, args);
      return 'success';
    } 
    catch(err) {
      console.error(err);
      return 'error';
    }
  }

}

module.exports = MistCommands;