const {
    Command
} = require('discord.js-commando');
const {
    MessageEmbed
} = require('discord.js');
const chalk = require('chalk')
module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['mute-user'],
            memberName: 'mute',
            group: 'moderation',
            description: 'Mute the tagged user (if the admin has made the role "Muted")',
            guildOnly: true,
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
            args: [{
                    key: 'userToMute',
                    prompt: 'Please mention the user you want to mute with @ or provide their ID.',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'What is your reason for muting this user?',
                    type: 'string',
                    default: message => `None`
                }
            ]
        });
    }

    async run(message, {
        userToMute,
        reason
    }) {
        console.log(chalk.cyan.bold(`Mute was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        const mutedRole = message.guild.roles.cache.find(
            role => role.name === 'Muted'
        );
        if (!mutedRole)
            return message.channel.send(
                'Role "Muted" Doesn\'t exist. Create the role first and then try again.'
            );
        const user = userToMute;
        if (!user)
            return message.channel.send('Please try again with a Valid User.');
        user.roles
            .add(mutedRole)
            .then(() => {
                const muteEmbed = new MessageEmbed()
                    .addField('Muted:', user)
                    .addField('Reason', reason)
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter("© Spartan")
                message.channel.send(muteEmbed);
            })
            .catch(err => {
                message.say(
                    'Failed to mute this user!'
                );
                return console.error(err);
            });
    }
};