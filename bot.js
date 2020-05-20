/* eslint-disable prettier/prettier */
require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// eslint-disable-next-line prettier/prettier
bot.launch();

// eslint-disable-next-line no-console
console.log('Bot started!');