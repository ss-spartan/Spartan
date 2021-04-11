const {
    Command
} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class SLeaveCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'sleave',
            aliases: ['forceleave', 'leaveguild', 'removeguild'],
            group: 'dev',
            memberName: 'sleave',
            description: 'Leaves a guild!',
            details: 'Only the bot owner can use this command!',
            examples: [',fleave 1234567890'],
            ownerOnly: true,
            args: [{
                    key: 'toLeave',
                    label: 'toLeave',
                    prompt: 'Please specify a guild to leave!',
                    type: 'string'
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'For what reason am I leaving the server?',
                    type: 'string'
                }
            ],
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);
    }

    async run(message, args) {


        let guild = this.client.guilds.cache.get(args.toLeave) || 'woopsies'
        if (guild == 'woopsies') return message.channel.send('That guild was not found! Please try again!')

        let reason = args.reason

        try {
            guild.leave()
            return message.channel.send(`Successfully left the guild **${guild.name}**!`)
        } catch (err) {
            return message.channel.send(`There was an error leaving the specified guild! \`${err}\``)
        }
    }
};