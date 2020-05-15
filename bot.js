const { prefix } = require("./config.json");
const { token } = require("./token.json");
const Discord = require("discord.js");
const axios = require("axios").default;
const client = new Discord.Client();

client.login(token);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Eu só faço atrapalhar");
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "midsommar") {
    msg.channel.send("A atriz não entrega");
  }

  if (command === "boa") {
    if (!args.length) {
      return msg.reply("Boa tambem");
    }
    switch (args[0]) {
      case "tarde":
        return msg.reply("BOA TARDE");
      case "noite":
        return msg.reply("BOA NOITE");
    }
  }
  if (command === "args-info") {
    if (!args.length) {
      return msg.channel.send(`Cade os argumento??, ${msg.author}!`);
    } else if (args[0] === "foo") {
      msg.channel.send("bar");
    }
    msg.channel.send(`O comando foi: ${command}\nArgumento: ${args}`);
  }

  if (command === "ping") {
    msg.reply("pong");
  }

  if (command === "beep") {
    msg.reply("boop");
  }

  if (command === "nome") {
    msg.reply(
      `O nominho do servidor é: ${msg.guild.name}, ele tem ${msg.guild.memberCount} membros\nFoi criado em ${msg.guild.createdAt}, e é do ${msg.guild.region}`
    );
  }

  if (command.startsWith("console" || "Console")) {
    if (!args.length) {
      return msg.reply(`What console?`);
    } else {
      var con = args.toString().replace(/,/g, " ");
      axios({
        url: "https://api-v3.igdb.com/platforms",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": "56fd14f1a21297c6372a2b8411e09389",
        },
        data: `fields *; search "${con}";`,
      })
        .then((response) => {
          console.log(response.data[0]);
          if (!response.data[0]) {
            return msg.reply("Console not found");
          } else {
            return msg.reply(
              `This is the ${response.data[0].name},${
                response.data[0].alternative_name
                  ? `\nAlternative name: ${response.data[0].alternative_name}`
                  : "\nNo other names found for this console"
              }${
                response.data[0].generation
                  ? `\nIt belongs to the ${response.data[0].generation} generation`
                  : ""
              }`
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
});
