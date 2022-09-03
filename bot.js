const {readFileSync, promises: fsPromises} = require('fs');


let token = readFileSync('TOKEN.json', 'utf-8');
token = JSON.parse(token.toString());

const Telegraf = require('telegraf');
const bot = new Telegraf(token.token);

const users = new Map([ ["visal_saosuo", {confirmed: false, fname:"Visal", lname:"Saosuo", age:20, location:"Kampong Chhnang"}], 
                        ["samnang_nounsinoeun", {confirmed: false, fname:"Samnang", lname:"Nounsinoeun", age:20, location:"Takeo"}]]);

bot.use((ctx) =>{
    console.log(users.get("@visalSaosuo"));
    console.log(ctx.chat);
})

bot.start((ctx) => {
    if(users.contain)
    ctx.reply("Welcome to D-Database");
});


bot.launch();