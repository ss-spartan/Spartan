const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class bugreportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bugreport',
            aliases: ['bug', 'bother', 'contact', 'suggest'],
            group: 'misc',
            memberName: 'support',
            guildOnly: true,
            description: 'Sends a support message to Spartan\'s main server!',
            examples: ['bugreport [bugs, issues, etc]'],
            throttling: {
                usages: 1,
                duration: 30
            },
            args: [{
                key: 'support',
                prompt: 'Please provide me a message to send to the support server!',
                type: 'string',
                default: 'N////A'
            }]
        });
    }

    async run(message, args, client) {
        var { support } = args;
        console.log(support)
        var channel = message.client.channels.cache.get('824723827375734865');
        

        if (support == 'N////A') {
            message.react("💢");
            return message.channel.send(`Please add an issue to your message!`)
        } else{
            if (message.content.search("https://")>-1) {
                message.delete({ timeout: 500 }); return message.channel.send('Hey! You\'re not allowed to report links. If It\'s a bot-breaking bug, contact the owner. \`,dev\`')
              } 

            try {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.user.tag}`, message.member.user.displayAvatarURL({ format: 'png' }))
                    .setColor('48886D')
                    .setTimestamp()
                    .setFooter(`Channel ID: ${message.channel.id}`)
                    .addField(message.guild.name + ', ' + message.channel.name, support);
                channel.send({ embed });

                await message.react("✔️").catch(console.error);


                return null;

            } catch (err) {
                return message.channel.send(`❎ | **An error occurred while running this command!** \`${err.name}: ${err.message}\``);
            }
        }
    }
}