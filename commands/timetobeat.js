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
          name = response[0].name;
        return msg.channel.send(
          `The average times to beat ${name} are:\n Main Story: ${main} hours\n Main Story + Extras: ${extra} hours\n Completionist: ${completionist} hours`
        );
      });
    }
  },
};
