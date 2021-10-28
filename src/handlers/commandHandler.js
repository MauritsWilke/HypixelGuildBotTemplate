const { readdirSync } = require('fs');
const { resolve } = require("path");

module.exports = (bot) => {
	bot.commands = new Map()

	const commandFolders = readdirSync(`./src/commands`)
	for (const folder of commandFolders) {
		const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'))
		for (const files of commandFiles) {
			const commandTemplate = require(resolve(`./src/commands/${folder}/${files}`));
			const command = new commandTemplate
			bot.commands.set(command.name, command)
			delete require.cache[resolve(`./src/commands/${folder}/${files}`)]
		}
	}
}