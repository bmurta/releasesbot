// Run dotenv
const config = require('./config.json');
const token = require('./token.json')
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token.token);

client.on("message", (msg) => {
  if (msg.content === "+ping") {
    msg.reply("pong");
  }
});
