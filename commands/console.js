const axios = require("axios").default;
const { IGDB_KEY } = require("../token.json");

module.exports = {
	name: 'console',
	description: 'Returns the details of a console',
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
};