// Run dotenv
const { prefix } = require("./config.json");
const { token } = require("./token.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

client.on("message", (msg) => {
  if (msg.content === `${prefix}ping`) {
    msg.reply("pong");
  } else if (msg.content === `${prefix}beep`) {
    msg.reply("boop");
  }
});
