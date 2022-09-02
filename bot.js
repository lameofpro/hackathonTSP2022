const {readFileSync, promises: fsPromises} = require('fs');


let token = readFileSync('TOKEN.json', 'utf-8');
token = JSON.parse(token.toString());

const Telegraf = require('telegraf');
const bot = new Telegraf(token.token);

bot.start((ctx) => {
    ctx.reply("Welcome to D-Database");
});


bot.launch();