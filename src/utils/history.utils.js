const utils = require('./utils');

const extract_last_master_from_history = content => content.split('\n').slice(-2)[0].split(' ')[2];

function end_challenge_content_for_history(history_content, challenger_name, master_win = true, config) {
  const old_master = extract_last_master_from_history(history_content);
  let new_item = (master_win ? '* ' : '+ ') + utils.format_date(new Date());
  const who_win = master_win ? old_master : challenger_name;
  const who_lost = master_win ? challenger_name : old_master;
  const what_next = master_win ? config.HISTORY_MESSAGE.dreadnought_win : config.HISTORY_MESSAGE.dreadnought_lose;
  new_item = new_item + ' ' + who_win + ' a vaincu ' + who_lost + ' ' + what_next + '\n';
  return history_content.slice(0, -3) + new_item + '```';
}

module.exports = {
  extract_last_master: extract_last_master_from_history,
  end_challenge_content: end_challenge_content_for_history
};
