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
	if (msg.content.startsWith(`${prefix}ping`)) {
      msg.reply("pong");
	}
	else if (msg.content.startsWith(`${prefix}ping`)) {
      msg.reply("boop");
	}
    else if (msg.content.startsWith(`${prefix}nome`)) {
      msg.reply(`O nominho do servidor é: ${msg.guild.name}, ele tem ${msg.guild.memberCount} membros\nFoi criado em ${msg.guild.createdAt}, e é do ${msg.guild.region}`);
  }
});
