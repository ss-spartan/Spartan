const {
    Command
} = require('discord.js-commando');
const {
    MessageEmbed
} = require('discord.js');
const chalk = require('chalk')
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['ban-member', 'ban-hammer', 'rape'],
            memberName: 'ban',
            group: 'moderation',
            description: 'Bans the given member\'s id or name.',
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['MANAGE_MESSAGES','BAN_MEMBERS'],
            args: [{
                    key: 'userToBan',
                    prompt: 'Please mention the user you want to ban with @ or provide their ID.',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to ban this user?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, {
        userToBan,
        reason
    }) {
        console.log(chalk.cyan.bold(`Ban was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        let user =
            message.mentions.members.first();
        message.guild.members.fetch(userToBan);
        if (user) {
            // Now we get the member from the user
            const member = message.guild.members.resolve(user);
            if (member) {
                member.ban({
                        days: 7,
                        reason: ''
                    })
                    .then(() => {
                        const banEmbed = new MessageEmbed()
                            .addField('Banned:', userToBan)
                            .addField('Reason', reason)
                            .setColor('#2f3136')
                            .setTimestamp()
                            .setFooter("© Spartan")
                        message.channel.send(banEmbed);
                    })
                    .catch(e => {
                        message.say(
                            'Something went wrong when trying to ban this user, I probably do not have the permission to ban them.'

                        );
                        return console.error(e);
                    });
            } else {
                message.channel.send("The mentioned user is not in this guild.");
            }
        } else {
            message.channel.send("You did not mention anyone to ban.");
        }
    }
}