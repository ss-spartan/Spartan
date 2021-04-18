const {
    Command
} = require('discord.js-commando')
const Discord = require('discord.js');
const chalk = require('chalk')
module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            guildOnly: true,
            aliases: ['oauth', 'get', 'link', 'invlink'],
            group: 'misc',
            memberName: 'invite',
            description: 'Gives you the invite link!',
            examples: [',invite'],
            throttling: {
                usages: 3,
                duration: 10
            }
        });
    }

    run(message) {
        var phrases = [
            'Add me to your server with this link!'
        ]

        var phrase = phrases[Math.round(Math.random() * (phrases.length - 1))];

        const embed = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`[${phrase}](https://discord.com/api/oauth2/authorize?client_id=747075491298803762&permissions=2096492023&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Fapi%2Fguilds%2F477733570736029699%2Fwidget.json&scope=bot)` + '\n ' + 'Some of the needed permissions by Spartan are:\n `MANAGE_MESSAGES`, `EMBED_LINKS`, `READ_MESSAGE_HISTORY`, `ADD_REACTIONS`, `CONNECT`, `SPEAK`')
            .setThumbnail(this.client.user.displayAvatarURL())
        return message.channel.send({
            embed
        });
    }
}