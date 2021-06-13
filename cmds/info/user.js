const Commando = require("discord.js-commando")
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");


module.exports = class TestCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'user',
                group: 'info',
                memberName: 'userinfo',
                description: 'Shows info on a user.',
                argsType: 'multiple',
                aliases:["whois", "ui"],
                clientPermissions: ["EMBED_LINKS"],
            userPermissions: ['SEND_MESSAGES'],
            });
        };

            async run(message,args, client) {
                const permissions = {
                    "ADMINISTRATOR": "Administrator",
                    "MANAGE_GUILD": "Manage Server",
                    "MANAGE_ROLES": "Manage Roles",
                    "MANAGE_CHANNELS": "Manage Channels",
                    "KICK_MEMBERS": "Kick Members",
                    "BAN_MEMBERS": "Ban Members",
                    "MANAGE_NICKNAMES": "Manage Nicknames",
                    "MANAGE_EMOJIS": "Manage Emojis",
                    "MANAGE_WEBHOOKS": "Manage Webhooks",
                    "MANAGE_MESSAGES": "Manage Messages",
                    "MENTION_EVERYONE": "Mention Everyone"
                }
                const mention = message.mentions.members.first() || message.member;
                const nick = mention.nickname === null ? "None" : mention.nickname;
                const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
                const usericon = mention.user.avatarURL;
                const act = mention.user.presence.status.toUpperCase();
                const game = mention.user.presence.game || "None";
                const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
                const finalPermissions = [];
                for (const permission in permissions) {
                    if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
                    else;
                }
                var flags = {
                    "": "None",
                    "DISCORD_EMPLOYEE": "Discord Employee",
                    "DISCORD_PARTNER": "Discord Partner",
                    "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
                    "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
                    "HYPESQUAD_EVENTS": "Hypesquad Events",
                    "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
                    "HOUSE_BRAVERY": "HypeSquad Bravery",
                    "HOUSE_BALANCE": "HypeSquad Balance",
                    "EARLY_SUPPORTER": "Early Supporter",
                    "TEAM_USER": "Team User",
                    "VERIFIED_BOT": "Verified Bot",
                    "VERIFIED_DEVELOPER": "Verified Bot Developer"
                };
                var bot = {
                    "true": "It's a bot.",
                    "false": "They are human."
                };
                const activities = [];
                let customStatus;
                for (const activity of mention.presence.activities.values()) {
                  switch (activity.type) {
                    case 'PLAYING':
                      activities.push(`🎮 playing **${activity.name}**`);
                      break;
                    case 'LISTENING':
                      if (mention.user.bot) activities.push(`Listening to **${activity.name}**`);
                      else activities.push(`<:Spotify:827329683946995813> listening to **${activity.details}** by **${activity.state}**`);
                      break;
                    case 'WATCHING':
                      activities.push(`Watching **${activity.name}**`);
                      break;
                    case 'STREAMING':
                      activities.push(`Streaming **${activity.name}**`);
                      break;
                    case 'CUSTOM_STATUS':
                      customStatus = `**${activity.emoji || "💬"}  ${activity.state}** `
                      break;
                  }
                }
                const userlol = new Discord.MessageEmbed()
                .setAuthor(`User:`, mention.user.avatarURL())
                .setThumbnail(usericon)
                .addField(`〉General Info`, `° **Name:** \`${mention.user.username}\` \n• **Tag:** \`${mention.user.discriminator}\` \n° **Nickname:** \`${nick}\``)
                .addField(`〉Overview`, `° **Badges:** \`${flags[mention.user.flags.toArray().join(", ")]}\` \n• **Status:** \`${act}\`\n° **Is Bot:** \`${bot[mention.user.bot]}\``)
                .addField(`〉Server Relating Info`, `° **Roles:** ${mention.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ")}\n° **Key Permissions:** \`${finalPermissions.join(', ') || "None"}\``)
                .addField(`〉Misc Info`, `**Account created on:** \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \n**Joined this server on:** \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
                .setThumbnail(mention.user.avatarURL())
                .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
                .setTimestamp()
                .setColor("#FFFEFE")
                if (activities.length > 0) userlol.setDescription('\u200b' + activities.join('\n'));
                if (customStatus) userlol.spliceFields(0, 0, { name: `custom status; \n${customStatus}`, value: "⠀"});
                message.channel.send(userlol)
            }
        }