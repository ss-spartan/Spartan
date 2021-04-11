const {Command} = require('discord.js-commando')
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
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        var phrases = [
            'Add me to your server with this link!',
            'Invite me and you shall prevail.'
        ]

        var phrase = phrases[Math.round(Math.random() * (phrases.length - 1))];

        const embed = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`[${phrase}](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=1043721303)` + '\u2000\ ' + 'You can add me and remove the permissions after I\'ve been added, however I **must** have: `EMBED_LINKS`, `CONNECT`, `ADD_REACTIONS`, and `MANAGE_MESSAGES` permissions.')
            .setThumbnail(this.client.user.displayAvatarURL())
        return message.channel.send({ embed });
    }
}