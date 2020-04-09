const challenge = require('../commands/challenge.command');
const init = require('../commands/init.command');
const help = require('../commands/help.command');
const master = require('../commands/master.command');
const set = require('../commands/set.command');

module.exports = async (client, msg) => {
  const { config } = client;

  const channel_to_post = msg.client.channels.cache.find(c => c.name === config.CHANNEL_TO_POST_NAME);
  config.is_master = msg.member.roles.cache.has(config.MASTER_GROUP_ID);

  // @Todo  help

  // init bot
  if (msg.content.startsWith(`${config.PREFIX} init 1`)) {
    // create post if there is no bot post
    init.init1(channel_to_post, config.MESSAGE_INIT.init, config.BOT_ID);
  } else if (msg.content.startsWith(`${config.PREFIX} init 2`)) {
    init.init2(channel_to_post, config);
  } else if (msg.content.startsWith(`${config.PREFIX} set`)) {
    set.set(msg, config);
  } else if (
    msg.content.startsWith(`${config.PREFIX}`)
    || msg.content.startsWith(`${config.PREFIX} -h`)
    || msg.content.startsWith(`${config.PREFIX} -help`)
    || msg.content.startsWith(`${config.PREFIX} -?`)
    || msg.content.startsWith(`${config.PREFIX} --h`)
    || msg.content.startsWith(`${config.PREFIX} --?`)
    || msg.content.startsWith(`${config.PREFIX} --help`)
  ) {
    help.print_help(msg, config);
  }

  // someone challenge the master
  if (msg.content.toLowerCase().includes(config.COMMANDS_PHRASES.challenge_phrase.toLowerCase())) {
    challenge.launch(msg, channel_to_post, config.CHALLENGER_MESSAGE_ID, config);
  }

  // resign the challenge
  if (msg.content.toLowerCase().includes(config.COMMANDS_PHRASES.resign_phrase.toLowerCase())) {
    challenge.resign(
      channel_to_post,
      msg,
      config.CHALLENGER_MESSAGE_ID,
      msg.author.username,
      config.RETURN_MESSAGE.not_be_challenger,
      config.RETURN_MESSAGE.remove_challenge_list
    );
  }

  // master win
  if (msg.content.toLowerCase().includes(config.COMMANDS_PHRASES.dreadnought_win_phrase.toLowerCase())) {
    master.win(msg, channel_to_post, config);
  }

  // master lose
  if (msg.content.toLowerCase().includes(config.COMMANDS_PHRASES.dreadnought_lose_phrase.toLowerCase())) {
    master.lose(msg, channel_to_post, config);
  }

  // @Todo, Bad could not defeat Bad
  // @Todo high score during
};
