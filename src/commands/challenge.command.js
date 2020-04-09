const challenger = require('../utils/challenger.utils');

function launch_challenge(msg, channel, challenge_msg_id, config) {
  if (config.is_master) {
    msg.reply(config.RETURN_MESSAGE.dreadnought_try_challenge);
    return;
  }
  channel.messages.fetch(challenge_msg_id)
    .then(editing_msg => {
      const editing_content = editing_msg.content;
      if (editing_content.includes(msg.author.username)) {
        msg.reply(config.RETURN_MESSAGE.already_in_challenge_list);
        return false;
      }
      editing_msg.edit(challenger.add_content(editing_content, msg.author.username));
      msg.reply(config.RETURN_MESSAGE.add_challenge_list);
      return true;
    }).catch(err => console.log(err))
  ;
}

module.exports = {
  launch: launch_challenge,
  resign: challenger.remove
};
