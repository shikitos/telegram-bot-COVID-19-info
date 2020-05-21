/* eslint-disable prettier/prettier */
require('dotenv').config();
const Telegraf = require('telegraf');
const markup = require('telegraf/markup');
const api = require('covid19-api');
const country = require('constants');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
    ctx.reply(
        'Welcome',
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
// bot.help((ctx) => ctx.reply('ol'));
//a person writes a country, in response to the number of cases, deaths, and recoveries
bot.hears(country, async(ctx) => {
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
        console.log('Error');
        ctx.reply('Error. Wrong country!');
    }
});

bot.hears('deaths' || 'Deaths', async(ctx) => {
    let dataChangeDeaths = {};
    try {
        dataChangeDeaths = await api.getDeaths(ctx.message.text);
        const formatDataChangeDeaths = `
Date: ${dataChangeDeaths[0][0].Date}
TotalDeaths: ${dataChangeDeaths[0][0].totalDeaths}
ChangeInTotal: ${dataChangeDeaths[0][0].changeInTotal}
ChangeTotalInPercent: ${dataChangeDeaths[0][0].ChangeTotalInPercent}
    `;
        ctx.reply(formatDataChangeDeaths);
    } catch {
        console.log('Error');
        ctx.reply('Error. Try "deaths" or "Deaths"!');
    }
});


// eslint-disable-next-line prettier/prettier
bot.launch();

// eslint-disable-next-line no-console
console.log('Bot started!');