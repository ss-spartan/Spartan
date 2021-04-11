const moment = require('moment');
const {
    MessageEmbed
} = require('discord.js');
const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee <:DiscordStaff:827295446400630873>',
    DISCORD_PARTNER: 'Discord Partner <:PartneredServer:827295513212354640>',
    BUGHUNTER_LEVEL_1: 'Bug Hunter <:BugHunter:827295705256296528>',
    HYPESQUAD_EVENTS: 'HypeSquad Events <:HypeSquad:827295594288119899>',
    HOUSE_BRAVERY: 'House of Bravery <:Bravery:827296898205351936>',
    HOUSE_BRILLIANCE: 'House of Brilliance <:Brilliance:827296943700967474>',
    HOUSE_BALANCE: 'House of Balance <:Balance:827296974930706522>',
    EARLY_SUPPORTER: 'Early Supporter <:EarlySupporter:827295815198048276>', //711610615348723721
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer <:VerifiedBotDev:827295861339848744>',
    NITROSUBSCRIPTION: '<:nitrosubscription:829711496917155840>'
};
const {
    Command
} = require('discord.js-commando')
const chalk = require("chalk")
module.exports = class UserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            aliases: ['user-info', 'whois', 'member-info'],
            group: 'info',
            memberName: 'user',
            description: 'Responds with detailed information on a user.',
            hidden: false,
            guildOnly: true,
            clientPermissions: ['EMBED_LINKS'],
            args: [{
                key: 'user',
                prompt: 'Write the name or tag user would you like to get information ?',
                type: 'user',
                default: msg => msg.author,
            }, ],
        });
    }

    async run(msg, {
        user
    }) {
        try {
            const game = await msg.guild.members.fetch(user.id);
            const userFlags = user.flags.toArray();
            const embed = new MessageEmbed()
                .setTitle(user.tag)
                .setThumbnail(user.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .addField('**↣ General Info ↢**', `**• ID:** ${user.id}\n**• Discord Join Date:** ${moment.utc(user.createdAt).format('MM/DD/YYYY h:mm A')}\n**• Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`);
            if (msg.guild) {

                try {

                    const member = await msg.guild.members.fetch(user.id);
                    const defaultRole = msg.guild.roles.cache.get(msg.guild.id);
                    const roles = member.roles.cache
                        .filter(role => role.id !== defaultRole.id)
                        .sort((a, b) => b.position - a.position)
                        .map(role => role.name);
                    embed
                        .addField('**↣ Server Member Info ↢**', `**• Nickname:** ${member.nickname ? member.nickname : 'No nickname'}\n**• Server Join Date:** ${moment.utc(member.joinedAt).format('MM/DD/YYYY h:mm A')}\n**• Highest Role:** ${member.roles.highest.id === defaultRole.id ? 'None' : member.roles.highest.name}\n**• Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}  `)
                        .setDescription(`**Roles**  ${member.roles.cache.map(roles => `<@&${roles.id}>`).join(', ')}`)
                        .setFooter(`Req by : ${msg.author.tag}`)
                        .setTimestamp()
                        .setColor("#2f3136");
                } catch {
                    embed.setFooter('Failed to resolve member, showing basic user information instead.');
                }
            }
            return msg.embed(embed);
        } catch (e) {
            msg.reply(`Oh no... \`${e}\``);
        }
    }
};