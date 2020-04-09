const message = require('../utils/message.utils');
const victory = require('../utils/victory.utils');

function init1(channel_to_post, message_beginning, bot_id) {
  for (let $i_message = 0; $i_message < 3; $i_message++) {
    message.init(channel_to_post, message_beginning, bot_id);
  }
}

async function init2(channel_to_post, config) {
  await message.edit(
    channel_to_post,
    config.HISTORY_MESSAGE_ID,
    config.MESSAGE_INIT.history
  );
  message.edit(
    channel_to_post,
    config.CHALLENGER_MESSAGE_ID,
    config.MESSAGE_INIT.challenger
  );
  victory.refresh(
    channel_to_post,
    config.VICTORY_HIGH_SCORE_MESSAGE_ID,
    config.MESSAGE_INIT.history,
    config
  );
}

module.exports = {
  init1,
  init2
};
