const {Command} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hackban',
            aliases: ['hb', 'banid'],
            group: 'moderation',
            memberName: 'hackban',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            description: 'Bans the given user ID, even if they\'re not in the server.',
            examples: ['hackban [userID] [reason]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                    key: 'member',
                    prompt: 'Please provide me a user ID to hackban!',
                    type: 'string',
                    validate: member => {
                        if (/[0-9]+$/g.test(member) && member.length === 18) return true;
                        return 'Invalid user ID!';
                    }
                },
                {
                    key: 'reason',
                    prompt: 'Please provide me a reason to hackban this user!',
                    type: 'string',
                    validate: reason => {
                        if (reason.length < 140) return true;
                        return 'Reason must be under 140 characters!';
                    }
                }
            ]
        });
    }

    async run(message, args) {
        console.log(chalk.cyan.bold(`Hack-Ban was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        const { member, reason } = args;

        if (member === this.client.user.id) return message.channel.send('You can\'t hackban me.');
        if (member === message.author.id) return message.channel.send('You can\'t hackban yourself.');

        this.client.users.fetch(member).then(async usr => {
            await message.channel.send(`Are you sure you want to ban **${usr.tag}**? \`\`(y/n)\`\``);
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                max: 1,
                time: 30000
            });

            if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
            if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

            await message.guild.ban(member, {
                reason: `${message.author.tag}: ${reason}`
            });
            return await message.channel.send(` <:spartan2:819686842362101760> Successfully banned **${usr.tag}**!`);
        })


    }
}