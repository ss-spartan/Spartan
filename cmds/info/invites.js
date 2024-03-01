const Commando = require("discord.js-commando")
const { MessageEmbed } = require("discord.js");
const chalk= require('chalk')

module.exports = class InvitesCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'invites',
                group: 'misc',
                memberName: 'invites',
                description: 'Check how many people a user has invited.',
                argsType: 'multiple',
                clientPermissions: ["EMBED_LINKS"],
            userPermissions: ['SEND_MESSAGES'],
            throttling: {
                usages: 3,
                duration: 10
            },
            });
        };
    
async run (message, args) {
    try {
        let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        let invites = await message.guild.fetchInvites()

        let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

        if (memberInvites.size <= 0) {
            return message.channel.send(`**${member.displayName} didn't invite anyone to the server!**`, (member === message.member ? null : member));
{}          }

        let content = memberInvites.map(i => i.code).join("\n");
        let index = 0;
        memberInvites.forEach(invite => index += invite.uses);

        let embed = new MessageEmbed()
            .setColor("#2f3136")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor(`Invite tracker for ${message.guild.name}`)
            .setDescription(`Information on Invites of **${member.displayName}**`)
            .addField("**No. Invited people**", index)
            .addField("Invitation Codes\n\n", content);
        message.channel.send(embed);

    } catch (e) {
        return message.channel.send(e.message)
    };
}}