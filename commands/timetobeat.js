const Discord = require("discord.js");
let hltb = require("howlongtobeat");
let hltbService = new hltb.HowLongToBeatService();

module.exports = {
  name: "timetobeat",
  aliases: ["ttb", "beat"],
  description: "Shows the time to beat based on howlongtobeat.com",
  args: true,
  usage: "<game to search for>",
  execute(msg, args) {
    var gam = args.toString().replace(/,/g, " ");
    hltbService.search(gam).then((response) => {
      console.log(response);

      var main = response[0].gameplayMain,
        extra = response[0].gameplayMainExtra,
        completionist = response[0].gameplayCompletionist,
        gameName = response[0].name;

      const messageEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(gameName)
        .setDescription(`The average hours to beat ${gameName} are:`)
        .setThumbnail(response[0].imageUrl)
        .addFields(
          {
            name: "Main Story:",
            value: main + "h",
            inline: true,
          },
          {
            name: "Main Story + Extras:",
            value: extra + "h",
            inline: true,
          },
          {
            name: "Completionist:",
            value: completionist + "h",
          }
        )
        .setTimestamp();

      return msg.channel.send(messageEmbed);
    });
  },
};
