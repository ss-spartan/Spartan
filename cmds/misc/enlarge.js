const Commando = require('discord.js-commando')
const { Util,
    MessageEmbed
} = require('discord.js')
const chalk = require('chalk')
const { parse } = require("twemoji-parser");

module.exports = class EnlargeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'enlarge',
            description: "Makes an emote bigger if possible.",
            group: 'misc',
            memberName: 'enlarge',
            aliases: ['e', 'emoji'],
            clientPermissions: ['EMBED_LINKS'],
            userPermissions: ['SEND_MESSAGES'],
            argsType: 'multiple',
        });
}
async run (message, args) {
    const emoji = args[0];
    if (!emoji) return message.channel.send("No emoji provided!");

    const custom = Util.parseEmoji(emoji);
    const embed = new MessageEmbed()
        .setTitle(`Enlarged version of ${emoji}`)
        .setColor("#2f3136")
        .setFooter('© Spartan')
        .setTimestamp();

    if (custom.id) {
        embed.setImage(
            `https://cdn.discordapp.com/emojis/${custom.id}.${
          custom.animated ? "gif" : "png"
        }`
        );
        return message.channel.send(embed);
    } else {
        let parsed = parse(emoji, {
            assetType: "png"
        });
        if (!parsed[0]) return message.channel.send("Invalid emoji!");

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    }
}
};