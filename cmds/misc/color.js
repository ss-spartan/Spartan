const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class ColorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'color',
            aliases: ['colour', 'hex'],
            group: 'misc',
            memberName: 'color',
            guildOnly: true,
            description: 'Shows a random color or a preview of the given color!',
            examples: ['color <color>']
        });
    }

    async run(message) {
        console.log(chalk.cyan.bold(`Color was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        var color = message.content.split(/\s+/g).slice(1).join(" ");

        if (!color) {
            var genColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
            const embed = new Discord.MessageEmbed()
                .setColor(genColour)
                .setImage(`https://dummyimage.com/50/${genColour.slice(1)}/&text=%20`)
                .setFooter(genColour);
            return message.channel.send({ embed: embed }).then(message=> {message.delete({timeout: 10000})})
        }

        if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length <= 8 && color < 16777215)) {
            const embed = await new Discord.MessageEmbed()
                .setColor(color)
                .setImage(`https://dummyimage.com/50/${color.slice(1)}/&text=%20`)
                .setFooter(color);
            return message.channel.send({ embed });

        } else {
            return message.channel.send("Invalid Parameters!");
        }
    }
}