const {readFileSync, promises: fsPromises} = require('fs');
const { nextTick } = require('process');


let token1 = readFileSync('TOKEN.json', 'utf-8');
token = JSON.parse(token1.toString());

const Telegraf = require('telegraf');
const bot = new Telegraf(token.token);

var users = new Map([ ["visal_saosuo", {confirmed: 0, fname:"វិសាល", lname:"សៅសួរ", age:20, location:"ខេត្តកំពុង់ឆ្នាំង"}], 
                        ["samnang_nounsinoeun", {confirmed: 0, fname:"Samnang", lname:"Nounsinoeun", age:20, location:"Takeo"}]]);
// Read from file
let loanInfo = readFileSync('loanData.json', 'utf-8');
loanInfo = JSON.parse(loanInfo.toString());


// bot.use((ctx) =>{
//     console.log(users.get("@visalSaosuo"));
//     console.log(ctx.chat);
//     next(ctx);
// })

bot.start((ctx) => {
    ctx.reply("ស្វាគមន៍មកកាន់ តារារះ​");
    if(users.has(ctx.chat.username) && users.get(ctx.chat.username).confirmed == 0){
        var user = users.get(ctx.chat.username);
        var stringPrep = "សូមបញ្ជាក់ព័ត៌មានខាងក្រោម: " + 
                        "\n\t\t\ឈ្មោះដើម: " + user.fname + 
                        "\n\t\t\tនាមត្រកូល: " + user.lname +
                        "\n\t\t\tអាយុ: " + user.age + 
                        "\n\t\t\tទីតាំង: " + user.location
        ctx.reply(stringPrep, {
            reply_markup:{
                inline_keyboard:[
                    [{text:"ត្រឹមត្រូវ", callback_data:"userInfoConfirm"}],
                    [{text:"មិនត្រឹមត្រូវ", callback_data:"userInforNotConfirm"}]
                ]
            }
        });
    }

    console.log(loanInfo);
});

bot.action("userInfoConfirm", ctx => {

    if(users.has(ctx.chat.username))
        users.get(ctx.chat.username).confirmed = 1;

    ctx.answerCbQuery("ទទួលបាន");
})

bot.action("userInforNotConfirm", (ctx) => {

    if(users.has(ctx.chat.username))
        users.get(ctx.chat.username).confirmed = -1;

    ctx.answerCbQuery("ទទួលបាន");
})

bot.command("/reciept", (ctx) => {
    bot.telegram.sendPhoto(ctx.chat.id, "https://drive.google.com/file/d/1nWkNwfG1RNF1Ty0V3mdEYq398Cd_Tah-/view?usp=sharing").then((m) =>{
        bot.telegram.pinChatMessage(ctx.chat.id, m.message_id);
    });
});


bot.launch();