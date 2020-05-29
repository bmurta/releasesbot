var moment = require('moment-timezone');

const axios = require("axios").default;
const { IGDB_KEY } = require("../token.json");

console.log(moment().tz("America/Bahia").format())
module.exports = {
    name: "releases",
    description: "Returns todays Releases for the console",
    execute(msg, args) {
        if (!args.length) {
            return msg.reply(`What console?`);
      } else {
        var con = args.toString().replace(/,/g, " ");
        axios({
            url: "https://api-v3.igdb.com/platforms",
            method: "POST",
            headers: {
              Accept: "application/json",
              "user-key": IGDB_KEY,
            },
            data: `fields *; search "${con}";`,
        }).then(response  => {

        })
      }
  },
};
