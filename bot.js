/* eslint-disable prettier/prettier */
require('dotenv').config();
const Telegraf = require('telegraf');
const markup = require('telegraf/markup');
const api = require('covid19-api');
const country = require('./constants.js');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
    ctx.reply(
        'Hello!\nI am a bot that can provide you with data on cases, deaths, and other events related to COVID-19.\nIf you want to know which countries are available — just say /help.',
        markup
        .keyboard([
            ['US', 'Russia'],
            ['Hungary', 'UK'],
        ])
        .resize()
        .extra()
    )
);
//Help
bot.help((ctx) => ctx.reply(country));
//a person writes a country, in response to the number of cases, deaths, and recoveries
bot.hears(['deaths', 'Deaths'], async(ctx) => {
    let dataChangeDeaths = {};
    try {
        dataChangeDeaths = await api.getDeaths(ctx.message.text);
        const formatDataChangeDeaths = `
Date: ${dataChangeDeaths[0][0].Date}
TotalDeaths: ${dataChangeDeaths[0][0].TotalDeaths}
ChangeInTotal: ${dataChangeDeaths[0][0].ChangeInTotal}
ChangeTotalInPercent: ${dataChangeDeaths[0][0].ChangeTotalInPercent}
    `;
        ctx.reply(formatDataChangeDeaths);
    } catch {
        console.log('Error');
        ctx.reply('Error. Try "deaths" or "Deaths"!');
    }
});
//a person writes a country, in response to the number of cases, deaths, and recoveries
bot.on('text', async(ctx) => {
    let data = {};
    try {
        data = await api.getReportsByCountries(ctx.message.text);
        const formatData = `
Country: ${data[0][0].country}
Cases: ${data[0][0].cases}
Deaths: ${data[0][0].deaths}
Recovered: ${data[0][0].recovered}
    `;
        ctx.reply(formatData);
    } catch {
        ctx.reply(
            `Error. ${ctx.message.text} is a wrong country!\nIf you want to know which country I can provide you with data about.\nJust say /help`
        );
        console.log(data[0][0].country);
    }
});

bot.launch();

// eslint-disable-next-line no-console
console.log('Bot started!');