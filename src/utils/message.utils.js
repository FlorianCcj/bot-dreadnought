function create_init_message(channel, init_message_begining, bot_id) {
  channel.messages.fetch()
    .then(msgs => {
      const bot_msgs = msgs.array().filter(m => m.author.id === bot_id);
      if (bot_msgs.length < 4) {
        channel.send('hey')
          .then(new_msg => {
            setTimeout(() => {
              new_msg.edit(`${init_message_begining}: ${new_msg.id}`);
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
