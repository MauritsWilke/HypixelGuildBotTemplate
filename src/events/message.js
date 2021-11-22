const config = require(`../config.json`)
const { logRaw } = require(`../utils/messageLogger`)

let lastTimestamp;
let logRegex = {
	"left the guild!": config.logSettings.joinedGuildMessages,
	"joined the guild!": config.logSettings.joinedGuildMessages,
	"left.": config.logSettings.joinLeaveMessages,
	"joined.": config.logSettings.joinLeaveMessages,
	"The guild has reached Level": config.logSettings.guildLevelUp
}

module.exports = async (bot, jsonMSG) => {

	const message = removeFormatting(flattenMessage(jsonMSG))
	console.log(message)
	for (const [string, enabled] of Object.entries(logRegex)) {
		if (enabled && message.includes(string) && !message.includes(":")) {
			logRaw(message.replace("Guild >", ""), true, true)
		}
	}

	if (jsonMSG.text != "You cannot say the same message twice!" || Date.now() - lastTimestamp < 20000) return;
	lastTimestamp = Date.now();
	bot.chat(`Error: cannot send the same message twice! | Timestamp ${Date.now()}`)
}

function flattenMessage(jsonMSG) {
	let completeMessage = jsonMSG.text
	if (jsonMSG?.extra) {
		for (ChatMessage of jsonMSG.extra) {
			completeMessage += ChatMessage.text
		}
	}
	return completeMessage
}

function removeFormatting(Message) {
	return Message.replace(/§./g, "")
}