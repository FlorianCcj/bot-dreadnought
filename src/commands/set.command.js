const utils = require('../utils/utils');
const message = require('../utils/message.utils');

function set(msg, channel, config) {
  const [, , pwd, edit_msg_id, ...content_table] = msg.content.split(' ');
  if (+utils.from_date_to_password(config.HASH) !== +pwd) {
    msg.reply(config.RETURN_MESSAGE.wrong_pwd_to_set + ' (' + new Date() + ')');
    return;
  }
  message.edit(channel, edit_msg_id, content_table.join(' '));
}

module.exports = {
  set
};
