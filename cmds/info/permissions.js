const { MessageEmbed } = require('discord.js');
const permissions = require('../../data/permissions.json');
const { oneLine } = require('common-tags');
const {Command} = require('discord.js-commando')
const chalk = require('chalk')

module.exports = class PermissionsCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'permissions',
        aliases: ['perms'],
        group: 'info',
        memberName: 'permissions',
        description: 'Shows all the permissions a user has',
        usage: '[mention]',
        clientPermissions: ["EMBED_LINKS"],
        userPermissions: ['SEND_MESSAGES'],
        argsType: 'multiple',
    });
};
  run(message, args) {

    const member = message.mentions.members.first() || 
      message.guild.members.cache.get(args[0]) || 
      message.member;

    // Get member permissions
    const memberPermissions = member.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
      if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
    }

    const embed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Permissions`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`\`\`\n${finalPermissions.join('\n')}\`\`\``)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#2f3136");
    message.channel.send(embed);
  }
};