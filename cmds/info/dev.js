const Discord = require("discord.js");
const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const chalk = require('chalk')

module.exports = class DevCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dev',
			group: 'misc',
			memberName: 'dev',
			description: 'Get to know the developer.',
			clientPermissions: ["EMBED_LINKS"],
            userPermissions: ['SEND_MESSAGES'],
			throttling: {
				usages: 2,
				duration: 10
			},
		});
	};

	async run(message, client) {
		const devembed = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setThumbnail(this.client.user.avatarURL())
            .addFields(
                {name: '❯ Spartan Developer <:spartan2:819686842362101760>',
                value: stripIndents`
                    • This bot is developed by <@275240603447721984>, if you have suggestions DM him.`,
                inline: true}
            )
            .setTimestamp()
            .setFooter("© Spartan")
			
		message.channel.send(devembed);
		console.log(chalk.cyan.bold(`Dev was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
	}
};