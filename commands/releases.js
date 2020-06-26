const igdb = require("igdb-api-node").default;
const { IGDB_KEY } = require("../token.json");

var moment = require('moment-timezone');
var now = moment().tz("America/Bahia").format("YYYY-MMM-DD");

// var date = new Date();
// var now = date.getTime();

console.log(now);
module.exports = {
  name: "releases",
  description: "Returns todays Releases for the console",
  args: true,
  usage: "<Platform to search for>",
  execute(msg, args) {
    const igdbClient = igdb(IGDB_KEY);

    var con = args.toString().replace(/,/g, " ");

    async function platform() {
      var thisplatform = await igdbClient
        .fields(["id", "name"])
        .limit(1)
        .search(con)
        .request("/platforms")
        .then((response) => {
          return (thisplatform = response.data);
        })
        .catch((err) => {
          console.error(err);
        });
      return thisplatform;
    }

    platform().then((plat) => {
      const platId = plat[0].id;

      async function todayids() {
        var ids = await igdbClient
          .fields(["game.name"])
          .where(`(platform = ${platId}) & (human = "${now}")`)
          .request("/release_dates")
          .then((response) => {
            return (ids = response.data);
          });
        return ids;
      }

      todayids().then((ids) => {
        const result = ids.map(a=> a.game.name)
        console.log(result)
        
        return msg.channel.send(result)
      });
    });
  },
};
