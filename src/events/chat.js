// TODO | Message Logging
// TODO | Dev Only Check
// TODO | Command Cooldown

const { Message } = require(`../utils/Message`)
const { logMessage } = require(`../utils/messageLogger`)
const config = require(`../config.json`)

module.exports = async (bot, IGN, MSG, translate, jsonMSG) => {
	if (IGN === bot.username) return;
	if (!jsonMSG.extra[0].text.startsWith(`§3Officer >`) && !jsonMSG.extra[0].text.startsWith(`§2Guild >`)) return;

	const message = new Message(jsonMSG)
	logMessage(message)

	if (!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = bot.commands.get(commandName);
	if (!command) return;
	const { settings } = command;

	// ! DEV ONLY CHECK
	if (settings?.ownerOnly) {
		return bot.chat("This command is limited to the owners of the bot")
	}

	console.log(` > ${message.author.username} ran ${commandName}`)
	try {
		bot.chat(`/chat ${message.channel}`)
		await sleep(20) // * This delay is needed for chat switching
		command.run(bot, message, args).catch(e => { console.log(e) })
	} catch (e) { console.log(e) }
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}