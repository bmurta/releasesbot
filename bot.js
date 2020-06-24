const fs = require("fs");
const { prefix } = require("./config.json");
const { DISCORD_BOT_TOKEN } = require("./token.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.login(DISCORD_BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Eu só faço atrapalhar");
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
  	return msg.channel.send(`I need a name to search for ${msg.author}!`);
	}

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});
