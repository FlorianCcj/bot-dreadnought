const challenger = require('../utils/challenger.utils');
const history = require('../utils/history.utils');
const victory = require('../utils/victory.utils');

async function master_win(msg, channel, config) {
  let do_we_continue = true;
  if (!config.is_master) {
    msg.reply(config.RETURN_MESSAGE.not_be_dreadnought);
    return;
  }
  if (msg.mentions.users.array().length === 0) {
    msg.reply(config.RETURN_MESSAGE.dreadnought_win_but_against_who);
    return;
  }
  const challenger_name = msg.mentions.users.first().username;

  // edit challenger message
  do_we_continue = await challenger.remove(
    channel,
    msg,
    config.CHALLENGER_MESSAGE_ID,
    challenger_name,
    config.RETURN_MESSAGE.not_in_challenger_list,
    config.RETURN_MESSAGE.dreadnought_win
  );

  if (!do_we_continue) {
    return;
  }

  // edit history message
  channel.messages.fetch(config.HISTORY_MESSAGE_ID)
    .then(history_msg => {
      history_msg.edit(history.end_challenge_content(history_msg.content, msg.mentions.users.first().username, true, config));

      // edit victory high score message

      victory.refresh(
        channel,
        config.VICTORY_HIGH_SCORE_MESSAGE_ID,
        history_msg.content,
        config
      );
    }).catch(err => console.log(err))
  ;
}

async function old_master_defeat(msg, channel, config) {
  if (!config.is_master) {
    msg.reply(config.RETURN_MESSAGE.not_dreadnought_not_allowed);
    return;
  }

  // edit challenger message
  challenger.remove(
    channel,
    msg,
    config.CHALLENGER_MESSAGE_ID,
    msg.author.username,
    config.RETURN_MESSAGE.dreadnought_lose_try_annouced,
    config.RETURN_MESSAGE.dreadnought_lose
  );

  // edit history message
  channel.messages.fetch(config.HISTORY_MESSAGE_ID)
    .then(history_msg => {
      history_msg.edit(history.end_challenge_content(history_msg.content, msg.author.username, false, config));

      // edit victory high score message

      victory.refresh(
        channel,
        config.VICTORY_HIGH_SCORE_MESSAGE_ID,
        history_msg.content,
        config
      );
    }).catch(err => console.log(err))
  ;
}

module.exports = {
  win: master_win,
  lose: old_master_defeat
};
