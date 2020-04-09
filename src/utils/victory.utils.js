
function calc_victory(history_content) {
  const data = {};
  let last_master = '';
  console.log(history_content);
  history_content.split('\n')
    .slice(3, -1)
    .map(str => str.split(' ')[2])
    .forEach(name => {
      if (!data.hasOwnProperty(name)) {
        data[name] = [];
      }
      const data_last_index = data[name].length - 1;
      if (data_last_index === -1 || last_master !== name) {
        data[name].push(1);
        last_master = name;
      } else {
        data[name][data_last_index]++;
      }
    })
  ;
  return data;
}

function from_calc_victory_to_content(victory_calculation, config) {
  const data = [];
  let content_table = [];
  Object.keys(victory_calculation).filter(k => k !== 'title').forEach(player => {
    victory_calculation[player].forEach((victories, index) => {
      data.push({
        victories,
        reigns: index + 1,
        player
      });
    });
  });
  data.sort((a, b) => b.victories - a.victories);
  content_table = data.map(
    place => `- Avec ${place['victories']} victoire(s) ${place['player']} (durant son reigne numero ${place['reigns']})`
  );
  return config.MESSAGE_INIT.victory_high_score.slice(0, -3) + content_table.join('\n') + '```';
}

function refresh_victory(channel, victory_hs_message_id, history_content, config) {
  // edit victory high score message
  channel.messages.fetch(victory_hs_message_id)
    .then(victory_msg => {
      victory_msg.edit(from_calc_victory_to_content(calc_victory(history_content), config));
    }).catch(err => console.log(err));
}

module.exports = {
  calc: calc_victory,
  content: from_calc_victory_to_content,
  refresh: refresh_victory
};
