const {
    Command
} = require('discord.js-commando');
const {
    MessageEmbed
} = require('discord.js');
const chalk = require('chalk')
module.exports = class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: ['unmute-user'],
            memberName: 'unmute',
            group: 'moderation',
            description: 'Unmute tagged users',
            guildOnly: true,
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
            args: [{
                key: 'userToUnmute',
                prompt: 'Please mention the user you want to Unmute with @ or provide their ID.',
                type: 'member'
            }],
            throttling: {
                usages: 3,
                duration: 10
            },
        });
    }

    async run(message, {
        userToUnmute
    }) {
        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole)
            return message.channel.send(
                'Role "Muted" Doesn\'t exist. Create the role first and then try again.'
            );
        const user = userToUnmute;
        if (!user)
            return message.channel.send('Please try again with a Valid User.');
            if (!user.roles.cache.has(mutedRole.id)) return message.channel.send(`${message.author}, they're already unmuted.`)
        user.roles
            .remove(mutedRole)
            .then(() => {
                const unmuteEmbed = new MessageEmbed()
                    .addField('Unmuted:', userToUnmute)
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter("© Spartan")
                message.channel.send(unmuteEmbed);
            })
            .catch(err => {
                message.say(
                    'Failed Unmute this user!'
                );
                return console.error(err);
            });
    }
};