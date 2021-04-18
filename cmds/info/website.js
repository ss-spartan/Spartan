const {Command} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class WebsiteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'website',
			description: 'Website of the bot',
            group:'info',
            memberName:'website',
			usage: '',
			enabled: true,
			args: false,
			throttling: {
                usages: 3,
                duration: 10
            },
		});
	}
    run(msg) {
        msg.delete()
		return msg.say('<:Spartan:824723825597480978> https://ss-spartan.github.io/')
    }
};