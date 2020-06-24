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
		const main = response.data[0].gameplayMain;
		console.log(main)
      });
    }
  },
};
