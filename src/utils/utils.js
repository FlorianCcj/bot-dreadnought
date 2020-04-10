const format_date = date => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${date.getFullYear()}/${m <= 9 ? '0' + m : m}/${d <= 9 ? '0' + d : d}`;
};

function from_date_to_password(hash = 0) {
  return +(format_date(new Date()) + new Date().getHours()).split('/').join('') + hash;
}

function slug(msg_content) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return msg_content.toString().toLowerCase().replace(p, c => b.charAt(a.indexOf(c)));
}

function send_error(msg, errors) {
  if (errors.length > 1) {
    msg.channel.send(errors.join('\n'));
  }
}

function is_secret_empty(secret) {
  return secret === undefined || secret === '';
}

async function check_needed(msg, client, config, init = false) {
  const errors = ['There is problems to bot working (permissions are not checked):']
  if (is_secret_empty(config.CHANNEL_TO_POST_NAME)) {
    errors.push('- You need to init the secret `CHANNEL_TO_POST_NAME`');
    send_error(msg, errors);
    return;
  }
  const channel_to_post = client.channels.cache.find(c => c.name === config.CHANNEL_TO_POST_NAME);
  if (channel_to_post === undefined) {
    errors.push('- I do not find the channel `' + config.CHANNEL_TO_POST_NAME + '` sorry. Check the spelling in the secret `CHANNEL_TO_POST_NAME`');
    send_error(msg, errors);
    return;
  }

  if (is_secret_empty(config.BOT_ID)) {
    errors.push('- You need to init secret `BOT_ID` get it with `\@bot_name`');
  }

  if (is_secret_empty(config.MASTER_GROUP_ID)) {
    errors.push('- You need to init secret `MASTER_GROUP_ID` get it with `\@group_name');
  }

  if (init) {
    send_error(msg, errors);
    return errors > 1;
  }

  await channel_to_post.messages.fetch().then(msgs => {
    const bot_msgs = msgs.array().filter(m => m.author.id === config.BOT_ID);
    if (bot_msgs.length < config.MESSAGE_NUMBER) {
      errors.push('- Needed messages are not initialised, launch `' + config.PREFIX + ' init 1` to create them or check the secret `BOT_ID`');
      errors.push('- Get `IDs` and set `secret`');
    }
  });

  if (is_secret_empty(config.HISTORY_MESSAGE_ID)) {
    errors.push('- You need to init secret `HISTORY_MESSAGE_ID`');
  } else {
    await channel_to_post.messages.fetch(config.HISTORY_MESSAGE_ID).catch(() => {
      errors.push('- I do not find the message check the secret `HISTORY_MESSAGE_ID`');
    });
  }
  if (is_secret_empty(config.CHALLENGER_MESSAGE_ID)) {
    errors.push('- You need to init secret `CHALLENGER_MESSAGE_ID`');
  } else {
    await channel_to_post.messages.fetch(config.CHALLENGER_MESSAGE_ID).catch(() => {
      errors.push('- I do not find the message check the secret `CHALLENGER_MESSAGE_ID`');
    });
  }
  if (is_secret_empty(config.VICTORY_HIGH_SCORE_MESSAGE_ID)) {
    errors.push('- You need to init secret `VICTORY_HIGH_SCORE_MESSAGE_ID`');
  } else {
    await channel_to_post.messages.fetch(config.VICTORY_HIGH_SCORE_MESSAGE_ID).catch(() => {
      errors.push('- I do not find the message check the secret `VICTORY_HIGH_SCORE_MESSAGE_ID`');
    });
  }

  send_error(msg, errors);
  return errors > 1;
}

module.exports = {
  check_needed,
  format_date,
  from_date_to_password,
  slug
};
