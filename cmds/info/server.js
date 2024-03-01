const Commando = require("discord.js-commando")
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");


module.exports = class TestCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'serverinfo',
                group: 'info',
                memberName: 'serverinfo',
                description: 'Shows the server info',
                aliases: ["server", "sinfo"],
                argsType: 'multiple',
                clientPermissions: ["EMBED_LINKS"],
            userPermissions: ['SEND_MESSAGES'],
            });
        };

            async run(message,args, client) {
        //command
        const mention = message.member;
        const afk = message.guild.afkChannel === null ? "\`None\`" : message.guild.afkChannel;
        let servericon = message.guild.iconURL;
        let verifLevels = {
            "NONE": "None",
            "LOW": "Low",
            "MEDIUM": "Medium",
            "HIGH": "(╯°□°）╯︵  ┻━┻ (High)",
            "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Very High)"
        };
    const serverembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
    .setThumbnail(servericon)
    .addField(`〉General Info`, `° **Owner:** ${message.guild.owner}\n° **Verification Lvl:** \`${verifLevels[message.guild.verificationLevel]}\``)
        .addField(`〉Overview`, `° **Total Channels:** \`${message.guild.channels.cache.size}\` \n° **Text Channels:** \`${message.guild.channels.cache.filter((c) => c.type === "text").size}\` \n° **Voice Channels:** \`${message.guild.channels.cache.filter((c) => c.type === "voice").size}\` \n° **AFK Channel:** ${afk} \n° **AFK Timeout:** \`${message.guild.afkTimeout} sec\` \n° **Total Roles:** \`${message.guild.roles.cache.size}\` \n° **Total Emojis:** \`${message.guild.emojis.cache.size}\``)
    .addField(`〉Member Info`, `° **Total Members:** \`${message.guild.memberCount}\` \n° **Humans:** \`${message.guild.members.cache.filter(member => !member.user.bot).size}\` \n° **Bots:** \`${message.guild.members.cache.filter(member => member.user.bot).size}\``)
    .addField(`〉Misc. Info`, `° **You joined on:** \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \n° **Server was created on:** \n\`${moment(message.guild.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
    .setThumbnail(message.guild.iconURL())
    .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
    .setColor("#FFFEFE")
    .setTimestamp();

    message.channel.send(serverembed);
    }
};