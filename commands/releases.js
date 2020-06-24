
const axios = require("axios").default;
const { IGDB_KEY } = process.env.IGDB_KEY;

var date = new Date();
var now = date. getTime()

console.log(now);
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
      }).then(response => {
        const id = response.data[0].id;
        const name = response.data[0].name

        axios({
          url: "https://api-v3.igdb.com/games",
          method: "POST",
          headers: {
            Accept: "application/json",
            "user-key": IGDB_KEY,
          },
          data: `fields *; where platforms = ${id} & release_dates = ${now}; sort date desc;`,
        }).then(response => {
            console.log(response.data[0])
            return msg.reply(`Todays releases for the ${name} are:\n ${response.data[0].name}`)
        });
      });
    }
  },
};
