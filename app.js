const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());

const bots = {
  kit: new TelegramBot("7659354620:AAH2l5XV9Yvel8A23-JTK0jywqKbSvY9sjY", { polling: true }),
  c3po: new TelegramBot("7265866547:AAE375mVBJ_8tZ980bwLbmWVXaz8p8QNDko", { polling: true }),
  jarvis: new TelegramBot("7699360160:AAGin6fgFrpKUZqjdcESpdL0eR6q9eTCbuE", { polling: true }),
  marvin: new TelegramBot("7552153519:AAE97MbfXAw8R03_Iv-YxJMMyJhgMYAY3ug", { polling: true }),
};

Object.entries(bots).forEach(([name, bot]) => {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `🤖 ${name.toUpperCase()} reporting for duty, Commander.`);
  });

  bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, `✅ ${name.toUpperCase()} is online and monitoring.`);
  });
});

app.get('/', (req, res) => res.send('Bot Fathers HQ online.'));

const port = process.env.PORT;
app.listen(port, '0.0.0.0', () => console.log(`Server listening on ${port}`));
