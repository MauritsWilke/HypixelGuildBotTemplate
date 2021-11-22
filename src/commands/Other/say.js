const Command = require(`../../utils/Command`)

module.exports = class extends Command {
	constructor() {
		super({
			name: "say",
			settings: {
				ownerOnly: true,
			}
		})
	}

	async run(bot, message, args) {
		bot.chat(args.join(" "))
	}
}