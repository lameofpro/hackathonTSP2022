const {readFileSync, promises: fsPromises} = require('fs');

let token1 = readFileSync('TOKEN.json', 'utf-8');
token1 = JSON.parse(token1.toString());

const Telegraf = require('telegraf');
const bot = new Telegraf(token1.token);

var users = new Map([ ["visal_saosuo", {confirmed: 0, fname:"វិសាល", lname:"សៅសួរ", age:20, location:"ខេត្តកំពុង់ឆ្នាំង"}], 
                        ["samnang_nounsinoeun", {confirmed: 0, fname:"Samnang", lname:"Nounsinoeun", age:20, location:"Takeo"}]]);
// Read from file
let loanInfo = readFileSync('loanData.json', 'utf-8');
loanInfo = JSON.parse(loanInfo.toString());

var chatID = 414137573;
var emNotice = true;

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
    var reciept = "https://drive.google.com/file/d/1Pb_j7DeEi9OWes0sATmo8rer645AWSrd/view?usp=sharing";

    bot.telegram.sendPhoto(ctx.chat.id, reciept, {
        caption:"តើព័ត៌មាននេះត្រឹមត្រូវដែលឬទេ?",
        reply_markup:{
            inline_keyboard:[
                [{text:"ត្រឹមត្រូវ", callback_data:"recieptC"}],
                [{text:"មិនត្រឹមត្រូវ", callback_data:"recieptW"}]
            ]
        }
    }).then((m) =>{
        bot.telegram.pinChatMessage(ctx.chat.id, m.message_id);
    });
    emNotice = false;
});

bot.action("recieptC", (ctx) => {
    ctx.answerCbQuery("ត្រឹមត្រូវ");
})

bot.action("recieptW", (ctx) => {
    ctx.answerCbQuery("មិនត្រឹមត្រូវ");
})

bot.command("/overdue", (ctx) => {
    ctx.reply("លោកអ្នកមិនបានបង់ប្រាក់នៅ ខែកញ្ញា ដល់អ៊ីប៊ិច។", {
        reply_markup:{
            inline_keyboard:[
                [{text:"ប្រាប់អ៊ីប៊ិច", callback_data:"informPayment"}]
            ]
        }
    });
})

bot.action("informPayment", (ctx) => {
    ctx.answerCbQuery("ប្រាប់ អ៊ីប៊ិច");
})

bot.command("/paymentToDue", (ctx) => {
    ctx.reply("លោកអ្នកនៅសល់ពេល ១២ថ្ងៃ ក្នុងការបង់ប្រាក់ដល់ អ៊ីប៊ិច។", {
        reply_markup:{
            inline_keyboard:[
                [{text:"ព័ត៌មានមិនត្រឹមត្រូវ", callback_data:"paymentToDoIncorrect"}]
            ]
        }
    });

    // console.log(ctx.chat.id);
})

bot.action("paymentToDoIncorrect", (ctx) => {
    ctx.answerCbQuery("ព័ត៌មានមិនត្រឹមត្រូវ");
})


function clicked(){
    console.log("Fuck you!");
    emNotice = true;
    console.log(emNotice);
}

bot.launch();