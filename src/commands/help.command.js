const { MessageEmbed } = require('discord.js');

function print_help(msg, config) {
  const cmd_message = ''
    + '--------\n'
    + 'Help: `config.PREFIX (-h,-?,-help,--h,--?,--help)`\n'
    + '--------\n'
    + '--------------------\n'
    + 'Challenger\n'
    + '--------------------\n'
    + '- launch challenge: `' + config.COMMANDS_PHRASES.challenge_phrase + '`\n'
    + '- resign challenge: `' + config.COMMANDS_PHRASES.resign_phrase + '`\n'
    + '-'.repeat(2 * config.DREADNOUGHT_NAME.length) + '\n'
    + config.DREADNOUGHT_NAME + '\n'
    + '-'.repeat(2 * config.DREADNOUGHT_NAME.length) + '\n'
    + '- win challenge`: ' + config.COMMANDS_PHRASES.dreadnought_win_phrase + '`\n'
    + '- lose challenge`: ' + config.COMMANDS_PHRASES.dreadnought_lose_phrase + '`\n'
    + 'the lose challenge command have to be done by the winner after having the ' + config.DREADNOUGHT_NAME + ' group\n'
    + '----------\n'
    + 'Admin\n'
    + '----------\n'
    + '- init phase 1: `' + config.PREFIX + ' init 1`\n'
    + '- init phase 2: `' + config.PREFIX + ' init 2`\n'
    + '- set a ot message: `' + config.PREFIX + ' set <pwd> <message_id> <content>`\n'
  ;
  const embed = new MessageEmbed()
    .setDescription('Exemple de super description')
    .addField('Command', cmd_message)
    .setFooter(`Powered by Florianccj, yours !`)
  ;
  /**
   * help: `config.PREFIX (-h,-?,-help,--h,--?,--help)`
   * Challenger
   * - launch challenge: config.COMMANDS_PHRASES.challenge_phrase
   * - resign challenge: config.COMMANDS_PHRASES.resign_phrase
   * config.DREADNOUGHT_NAME:
   * - win challenge: config.COMMANDS_PHRASES.dreadnought_win_phrase
   * - lost challenge: config.COMMANDS_PHRASES.dreadnought_lose_phrase
   * Admin
   * - init phase 1: config.PREFIX init 1
   * - init 2 (need set message id): config.PREFIX init 1
   * - set a message: config.PREFIX set <pwd> <message_id> <content>
   */
  // admin
  //  - init 1
  // Challenger
  msg.channel.send(embed);
}

module.exports = {
  print_help
};
