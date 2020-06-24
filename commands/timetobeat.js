module.exports = {
	name: 'timetobeat',
	description: 'Shows the time to beat based on howlongtobeat.com',
	execute(msg, args) {
		if (!args.length) {
			return msg.reply(`What console?`);
		}
	},
};