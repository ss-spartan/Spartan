const {
    stripIndents
} = require('common-tags');
const {
    Command
} = require('discord.js-commando')
const chalk = require('chalk')
const {MessageEmbed} = require("discord.js")
module.exports = class LockdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lockdown',
            aliases: ['lock', 'ld'],
            group: 'moderation',
            memberName: 'lockdown',
            description: 'Prevents users from posting in the current channel!',
            details: 'Use `lockdown start` and `lockdown stop` to start and stop a lockdown respectively!',
            guildOnly: true,
            clientPermissions: ['MANAGE_GUILD'],
            userPermissions: ['ADMINISTRATOR'],
            examples: ['lockdown [start/stop]'],
            args: [{
                key: 'type',
                prompt: 'Please enter either start or stop.',
                type: 'string',
                default: 'start',
                validate: type => {
                    if (['start', 'stop'].includes(type.toLowerCase())) return true;
                    return 'Please enter either start or stop.';
                },
                parse: type => type.toLowerCase()
            }],
            throttling: {
                usages: 2,
                duration: 10
            },
        });
    }

    async run(message, args) { // eslint-disable-line consistent-return
        const {
            type
        } = args;
        if (type === 'start') {
            await message.channel.overwritePermissions([
                {
                    id: message.guild.id,
                    deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
                },
            ]);
            
            
            `Lockdown initiated by ${message.author.tag}`
            return message.channel.send(new MessageEmbed().setDescription(`>>> <:spartanWarning:839194405049991168> ${message.author}, **Lockdown has been initiated! Most users are now unable to send a message in this channel!**\n\Please use \`lockdown stop\` to end the lockdown!`).setColor("YELLOW"))

        } else if (type === 'stop') {
            await message.channel.overwritePermissions([
                {
                    id: message.guild.id,
                    allow: ['SEND_MESSAGES', 'ADD_REACTIONS'],
                },
            ]); 
            `Lockdown terminated by ${message.author.tag}`
            return message.channel.send(new MessageEmbed().setDescription('>>> ✅ **Lockdown has ended, everyone is able to talk again!**').setColor("GREEN"))
        }
    }
};