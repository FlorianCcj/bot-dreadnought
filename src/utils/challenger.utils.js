const utils = require('./utils');

function remove_challenger_in_list(old_content, username) {
  const table_content = old_content.split('\n');
  return table_content.filter(c => !c.includes(`- ${username} depuis`)).join('\n');
}

async function remove_challenger(channel, msg, editing_message_id, username, message_fail, message_succes) {
  let do_we_continue = true;
  await channel.messages.fetch(editing_message_id)
    .then(editing_msg => {
      const editing_content = editing_msg.content;
      if (!editing_content.includes(username)) {
        msg.reply(message_fail);
        do_we_continue = false;
        return;
      }
      editing_msg.edit(remove_challenger_in_list(editing_content, username));
      msg.channel.send(message_succes);
    }).catch(err => console.log(err))
  ;
  return do_we_continue;
}

const add_challenger_in_list = (old_content, username) => {
  const new_item = '- ' + username + ' depuis le ' + utils.format_date(new Date()) + '\n';
  return old_content.slice(0, -3) + new_item + '```';
};

module.exports = {
  add_content: add_challenger_in_list,
  remove: remove_challenger
};
