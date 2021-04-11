const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');
const chalk = require('chalk')
const Discord = require('discord.js')
const flags = {
    DISCORD_EMPLOYEE: '<:DiscordStaff:827295446400630873>',
    DISCORD_PARTNER: '<:PartneredServer:827295513212354640>',
    BUGHUNTER_LEVEL_1: '<:BugHunter:827295705256296528>',
    HYPESQUAD_EVENTS: '<:HypeSquad:827295594288119899>',
    HOUSE_BRAVERY: '<:Bravery:827296898205351936>',
    HOUSE_BRILLIANCE: '<:Brilliance:827296943700967474>',
    HOUSE_BALANCE: '<:Balance:827296974930706522>',
    EARLY_SUPPORTER: '<:EarlySupporter:827295815198048276>',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: '<:VerifiedBotDev:827295861339848744>'
};



module.exports = class StatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'status',
			aliases: [],
			group: 'info',
			memberName: 'status',
			description: 'Get a user\'s status.',
			details: `Get detailed information on the specified user.`,
			userPermissions: ['SEND_MESSAGES'],
			clientPermissions: ["EMBED_LINKS"],
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: 'which user would you like to spy on today?\n',
					type: 'member',
					default: ''
				}
			]
		});
	}

	async run(message, args) {
        try{
        const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!member) 
             return message.channel.send('Please mention the user for the status.');
           const userFlags = (await member.user.fetchFlags()).toArray();
           const activities = [];
           let customStatus;
           for (const activity of member.presence.activities.values()) {
             switch (activity.type) {
               case 'PLAYING':
                 activities.push(`🎮 playing **${activity.name}**`);
                 break;
               case 'LISTENING':
                 if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
                 else activities.push(`<:Spotify:827329683946995813> listening to **${activity.details}** by **${activity.state}**`);
                 break;
               case 'WATCHING':
                 activities.push(`Watching **${activity.name}**`);
                 break;
               case 'STREAMING':
                 activities.push(`Streaming **${activity.name}**`);
                 break;
               case 'CUSTOM_STATUS':
                 customStatus = `${activity.emoji || "No Emoji"}  ${activity.state} `
                 break;
             }
           }
           const uiembed = new Discord.MessageEmbed() 
             .setTitle(`${member.displayName}'s status`)
             .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
             if (activities.length > 0) uiembed.setDescription(activities.join('\n'));
             if (customStatus) uiembed.addField('Custom Status',  customStatus)
             .setColor("#2f3136")
           message.channel.send(uiembed);
           }catch(e){
               console.log(e)
           }
         }
}