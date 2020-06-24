const Discord = require('discord.js');
let hltb = require("howlongtobeat");
let hltbService = new hltb.HowLongToBeatService();

module.exports = {
  name: "timetobeat",
  description: "Shows the time to beat based on howlongtobeat.com",
  execute(msg, args) {
    if (!args.length) {
      return msg.reply(`What game?`);
    } else {
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
          .setDescription(`The average times to beat ${gameName} are:`)
          .setThumbnail(response[0].imageUrl)
          .addFields(
            {
              name: "Main Story:",
			  value: main,
			  inline: true
            },
            {
              name: "Main Story + Extras:",
			  value: extra,
			  inline: true
			},
			{
			  name: "Completionist:",
			  value: completionist
			}
          )
          .setTimestamp()

        return msg.channel.send(messageEmbed);
      });
    }
  },
};
