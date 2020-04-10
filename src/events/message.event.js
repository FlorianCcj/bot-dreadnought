const challenge = require('../commands/challenge.command');
const init = require('../commands/init.command');
const help = require('../commands/help.command');
const master = require('../commands/master.command');
const set = require('../commands/set.command');
const utils = require('../utils/utils');

module.exports = async (client, msg) => {
  let print_help = true;
  console.log('info-' + msg.author.username + ': ' + msg.content);

  const { config } = client;

  const channel_to_post = msg.client.channels.cache.find(c => c.name === config.CHANNEL_TO_POST_NAME);
  config.is_master = msg.member.roles.cache.has(config.MASTER_GROUP_ID);

  // init bot
  if (msg.content.startsWith(`${config.PREFIX} init 1`)) {
    // create post if there is no bot post
    await utils.check_needed(msg, client, config, true);
    init.init1(channel_to_post, config);
    print_help = false;
  } else if (msg.content.startsWith(`${config.PREFIX} init 2`)) {
    if (await utils.check_needed(msg, client, config)) {
      return;
    }
    init.init2(channel_to_post, config);
    print_help = false;
  } else if (msg.content.startsWith(`${config.PREFIX} set`)) {
    if (await utils.check_needed(msg, client, config)) {
      return;
    }
    set.set(msg, config);
    print_help = false;
  }

  // someone challenge the master
  if (
    utils.slug(msg.content).includes(utils.slug(config.COMMANDS_PHRASES.challenge_phrase))
    || msg.content.startsWith(`${config.PREFIX} fight`)
  ) {
    if (await utils.check_needed(msg, client, config)) {
      return;
    }
    challenge.launch(msg, channel_to_post, config.CHALLENGER_MESSAGE_ID, config);
    print_help = false;
  }

  // resign the challenge
  if (
    utils.slug(msg.content).includes(utils.slug(config.COMMANDS_PHRASES.resign_phrase))
    || msg.content.startsWith(`${config.PREFIX} resign`)
  ) {
    if (await utils.check_needed(msg, client, config)) {
      return;
    }
    challenge.resign(
      channel_to_post,
      msg,
      config.CHALLENGER_MESSAGE_ID,
      msg.author.username,
      config.RETURN_MESSAGE.not_be_challenger,
      config.RETURN_MESSAGE.remove_challenge_list
    );
    print_help = false;
  }

  // master win
  if (
    utils.slug(msg.content).includes(utils.slug(config.COMMANDS_PHRASES.dreadnought_win_phrase))
    || msg.content.startsWith(`${config.PREFIX} win`)
  ) {
    if (await utils.check_needed(msg, client, config)) {
      return;
    }
    master.win(msg, channel_to_post, config);
    print_help = false;
  }

  // master lose
  if (
    utils.slug(msg.content).includes(utils.slug(config.COMMANDS_PHRASES.dreadnought_lose_phrase))
    || msg.content.startsWith(`${config.PREFIX} lose`)
  ) {
    if (await utils.check_needed(msg, client, config)) {
      return;
    }
    master.lose(msg, channel_to_post, config);
    print_help = false;
  }

  if (
    print_help
    && msg.content.startsWith(`${config.PREFIX}`)
    || msg.content.startsWith(`${config.PREFIX} -h`)
    || msg.content.startsWith(`${config.PREFIX} -help`)
    || msg.content.startsWith(`${config.PREFIX} -?`)
    || msg.content.startsWith(`${config.PREFIX} --h`)
    || msg.content.startsWith(`${config.PREFIX} --?`)
    || msg.content.startsWith(`${config.PREFIX} --help`)
  ) {
    help.print_help(msg, config);
    await utils.check_needed(msg, client, config);
  }

  // @Todo high score during
};
