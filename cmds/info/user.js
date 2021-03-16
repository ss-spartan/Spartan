const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');
const chalk = require('chalk')


module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'user-info',
			aliases: ['user'],
			group: 'info',
			memberName: 'user',
			description: 'Get info on a user.',
			details: `Get detailed information on the specified user.`,
			userPermissions: ['SEND_MESSAGES'],
			clientPermissions: ["EMBED_LINKS"],
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: 'what user would you like to have information on?\n',
					type: 'member',
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
		console.log(chalk.cyan.bold(`User-info was ran by:`, chalk.red.bold`${msg.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${msg.guild.name}`))
		const member = args.member || msg.member;
		const { user } = member;
		return msg.embed({
			color: 3092790,
			fields: [
				{
					name: '❯ Member Details',
					value: stripIndents`
						${member.nickname !== null ? ` • Nickname: ${member.nickname}` : '• No nickname'}
						• Roles: ${member.roles.cache.map(roles => `<@&${roles.id}>`).join(' ')}
						• Joined at: ${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}
					`
				},
				{
					name: '❯ User Details',
					/* eslint-disable max-len */
					value: stripIndents`
						• Created at: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}${user.bot ? '\n• Is a bot account' : ''}
					`
					/* eslint-enable max-len */
				}
			],
      thumbnail: { url: user.displayAvatarURL({ dynamic: true }) },
      timestamp: new Date(),
      footer: {
        text: "© Spartan"
      }
		});
	}
};