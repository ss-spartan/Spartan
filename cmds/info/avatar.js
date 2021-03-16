const Commando = require('discord.js-commando')
const chalk = require('chalk')

module.exports = class AvatarCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['av'],
            group: 'misc',
            memberName: 'avatar',
            description: 'Shows the avatar of a mentioned user, or your own.',
            usage: '[mention | username | ID | nickname] (optional)',
            clientPermissions: ["EMBED_LINKS"],
            userPermissions: ['SEND_MESSAGES'],
            argsType: 'multiple',
        });
    };

    async run(message, args) {
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args.join('')) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
            if (!member) return message.channel.send('Hey! I was not able to find that member. Try again!');

            if (args[0]) {
                message.channel.send({
                    embed: {
                        title: `${member.user.username}'s avatar.`,
                        color: '#2f3136',
                        image: {
                            url: `${member.user.displayAvatarURL({ dynamic: true })}?size=4096`
                        },
                        timestamp: new Date(),
                        footer: {
                            text: "© Spartan",
                            icon_url: message.guild.iconURL({ dynamic: true })
                        }
                    }
                });
                console.log(chalk.cyan.bold(`Avatar was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
            } else {
                message.channel.send({
                    embed: {
                        title: `${message.author.username}'s avatar.`,
                        color: '#2f3136',
                        image: {
                            url: `${message.author.displayAvatarURL({ dynamic: true })}?size=4096`
                        },
                        timestamp: new Date(),
                        footer: {
                            text: "© Spartan" , 
                            icon_url: message.guild.iconURL({ dynamic: true })
                        }
                    }
                });
            };
            console.log(chalk.cyan.bold(`Avatar was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    };
};