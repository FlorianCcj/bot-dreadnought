# Bot - Dreadnought

## Dependancies

cf package.json > engines

## Install

`npm i`

## Config

good luck with all variable in config.js and secret.js

### Secret variable

| Var name                      | Desc                                                                                        |
| TOKEN                         | Auth token, you get it on [discordapp](discordapp.com/developers/applications/)             |
| PREFIX                        | the first char you write to easy command                                                    |
| HASH                          | a number to make your password a bit more complicate (but stay easy)                        |
| DREADNOUGHT_NAME              | the name of the dreadnough thx captain obvious                                              |
| HISTORY_MESSAGE_ID            | the id of the message where the bot will add the history                                    |
| CHALLENGER_MESSAGE_ID         | the id of the message where the bot will add the challenger list                            |
| VICTORY_HIGH_SCORE_MESSAGE_ID | the id of the message where the bot will add the high score                                 |
| BOT_ID                        | the id of the bot you can get it with \@BotName on discord                                  |
| MASTER_GROUP_ID               | the id of the group which target the dreadnought you can get it with \@GroupName on discord |
| CHANNEL_TO_POST_NAME          | the name of the channel where are the message                                               |

### For heroku

all in secret.js must be in variable

### Rights

* To add the bot thisone who want to add it need `manage the server` right
* I removed all the right in all channel for the group I give to the bot
* In one channel, i let the right I let the rights to `read message`, `send message` and `add link`. In this channel the player can speak to the bot (you can let all channel if you want)
* In the channel designate by `CHANNEL_TO_POST_NAME` i let following rights: `read message`, `send message`, `manage message` and `see old message`.

## Lauch dev

in `src/main.js` be sur of `const env = 'dev';`

then `npm run serve`

## Production with heroku

* on discordapp.com/developers/applications/
* create an application (it will be the bot s name)
* bot > add a bot > Token > copy > paste it in your secret
* oauth2 > check bot > copy link > open in a new tab > add the bot to your server


* on https://dashboard.heroku.com/login
* new app > deploy > do ... as you want or as you can to add code (you can find it in https://github.com/FlorianCcj/bot-dreadnought)
* settings > Configs Vars > Reveal Configs Vars > set all your vars
* Deploy > Manual deploy > Deploy Branch
* Resources > activate `web` and `worker`
* if you want to see log: more > views logs

## Still todo

* test
