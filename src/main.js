const { Client } = require('discord.js');
const CONFIG = require("../config");
const fs = require('fs');
const client = new Client({
  disableEveryone: true
});

client.config = CONFIG;

const env = 'dev';

if (env === 'dev') {
  const SECRET = require("../secret");
  client.config.TOKEN = SECRET.TOKEN;
  client.config.PREFIX = SECRET.PREFIX;
  client.config.DREADNOUGHT_NAME = SECRET.DREADNOUGHT_NAME;
  client.config.HASH = SECRET.HASH;

  client.config.HISTORY_MESSAGE_ID = SECRET.HISTORY_MESSAGE_ID;
  client.config.CHALLENGER_MESSAGE_ID = SECRET.CHALLENGER_MESSAGE_ID;
  client.config.VICTORY_HIGH_SCORE_MESSAGE_ID = SECRET.VICTORY_HIGH_SCORE_MESSAGE_ID;

  client.config.BOT_ID = SECRET.BOT_ID;
  client.config.MASTER_GROUP_ID = SECRET.MASTER_GROUP_ID;
  client.config.CHANNEL_TO_POST_NAME = SECRET.CHANNEL_TO_POST_NAME;
} else {
  console.log('');
}

// client.on('ready', () => require('./events/ready.event.js')(client));
fs.readdir('./src/events', (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach(file => {
    client.on(
      file.split('.')[0],
      require(`./events/${file}`).bind(null, client)
    );
  });
});

client.on('error', console.error);
client.on('warn', console.warn);
// client.on('debug', console.log);

client.login(client.config.TOKEN);
