const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = "7642587098:AAHSs27-OPYKjTwx-Oc6vWqAmD3l4EtsqnY";

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/notify (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const refNumber = match[1];

    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Accept Payment", callback_data: "accept_payment" },
                    { text: "Reject Payment", callback_data: "reject_payment" }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, `Payment Reference: ${refNumber}`, options);
});

bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;

    if (query.data === "accept_payment") {
        bot.sendMessage(chatId, "Payment Accepted.");
        // HTTP request to ESP32 here
    } else if (query.data === "reject_payment") {
        bot.sendMessage(chatId, "Payment Rejected.");
    }
});
