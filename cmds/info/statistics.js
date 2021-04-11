const { Command } = require('discord.js-commando');
const moment = require('moment');
require('moment-duration-format');
const { stripIndents } = require('common-tags');
const chalk = require('chalk')


module.exports = class StatsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'about',
			aliases: ['binfo'],
			group: 'info',
			memberName: 'stats',
			description: 'Displays statistics about the bot.',
			userPermissions: ['SEND_MESSAGES'],
			clientPermissions: ["EMBED_LINKS"],
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	run(msg) {
		return msg.embed({
			color: 3092790,
			description: '**About Spartan <:Spartan:824723825597480978>**',
			fields: [
				{
					name: '❯ Uptime',
					value: moment.duration(this.client.uptime)
						.format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]'),
					inline: true
				},
				{
					name: '❯ Memory usage',
					value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
					inline: true
				},
				{
					name: '❯ General Stats',
					value: stripIndents`
					• Guilds: ${msg.client.guilds.cache.size}
					• Channels: ${msg.client.channels.cache.size}
					• Users: ${this.client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b)}
					`,
					inline: true
				},
				{
					name: '❯ Bot Invite',
					value: stripIndents`
					• [Invite Spartan](https://discord.com/oauth2/authorize?client_id=747075491298803762&scope=bot&permissions=269872255)
					• [Visit Spartan Website](http://ss-spartan.github.io/)
					`
				},
			],
            thumbnail: { url: this.client.user.displayAvatarURL({ format: 'png' }) },
      footer: {
        text: "© Spartan"
      }
		});
	}
};