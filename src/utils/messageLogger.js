const fetch = require(`node-fetch`)
const { logSettings } = require(`../config.json`)

function logMessage(Message) {
	let messageContent = `${Message.content}`;
	if (logSettings.logGuild && logSettings.logOfficer) {
		if (process.env.GUILD_LOGGING_WEBHOOK && process.env.OFFICER_LOGGING_WEBHOOK) {
			messageContent = `${Message.content}`;
		} else {
			messageContent = `${Message.channel === "o" ? "**Officer >**" : "**Guild >**"} ${Message.content}`;
		}
	}

	if (logSettings.logGuild && Message.channel === "g") {
		fetch(process.env.GUILD_LOGGING_WEBHOOK, {
			"method": "POST",
			"headers": { "Content-Type": "application/json" },
			"body": JSON.stringify({
				"username": `${Message.author.rank ?? ""} ${Message.author.username} ${Message.author.guildRank ?? ""}`,
				"content": messageContent,
				"avatar_url": `https://minotar.net/avatar/${Message.author.username}/128.png`,
				"allowed_mentions": {
					"everyone": false,
					"roles": false,
					"users": false
				}
			})

		}).catch(e => console.log(e))
	}

	if (logSettings.logOfficer && Message.channel === "o") {
		const logWebhook = process.env.OFFICER_LOGGING_WEBHOOK || process.env.GUILD_LOGGING_WEBHOOK;
		fetch(logWebhook, {
			"method": "POST",
			"headers": { "Content-Type": "application/json" },
			"body": JSON.stringify({
				"username": `${Message.author.rank ?? ""} ${Message.author.username} ${Message.author.guildRank ?? ""}`,
				"content": messageContent,
				"avatar_url": `https://minotar.net/avatar/${Message.author.username}/128.png`,
				"allowed_mentions": {
					"everyone": false,
					"roles": false,
					"users": false
				}
			})

		}).catch(e => console.log(e))
	}
}

module.exports = { logMessage }