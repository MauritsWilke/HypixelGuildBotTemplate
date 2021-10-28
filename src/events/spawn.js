const config = require(`../config.json`)

let spawnCount = 0;
module.exports = (bot) => {
	spawnCount++
	if (spawnCount === 1) {
		bot.chat(`/g join ${config.guildName}`)
		config.spawnMessages.forEach(message => {
			bot.chat(message)
		})
		return console.log(`Connected to ${bot._client.socket._host}.`)
	}
	if (spawnCount % 2 === 0) return console.log(`Bot switched to limbo. Ping: ${bot.player.ping}`)
	console.log(`Connected to ${bot._client.socket._host}. Ping: ${bot.player.ping}`)
}