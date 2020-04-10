function create_init_message(channel, config) {
  channel.messages.fetch()
    .then(msgs => {
      const bot_msgs = msgs.array().filter(m => m.author.id === config.BOT_ID);
      if (bot_msgs.length < config.MESSAGE_NUMBER) {
        channel.send('hey')
          .then(new_msg => {
            setTimeout(() => {
              new_msg.edit(`${config.MESSAGE_INIT.init}: ${new_msg.id}`);
            }, 1000);
          }).catch(err => console.log(err))
        ;
      }
    }).catch(err => console.log(err));
}

const edit_init_message = (channel, message_id, init_content) => {
  channel.messages.fetch(message_id)
    .then(msg => {
      msg.edit(init_content);
    })
    .catch(err => console.log(err))
  ;
};

module.exports = {
  edit: edit_init_message,
  init: create_init_message
};
