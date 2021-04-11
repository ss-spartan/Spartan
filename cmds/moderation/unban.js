const { Command } = require('discord.js-commando');
const {MessageEmbed} = require('discord.js')
const chalk = require('chalk')
module.exports = class UnbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unban',
      group: 'moderation',
      memberName: 'unban',
      description: 'Unbans a user',
      examples: ['unban @Kevin', 'unban @Kevin All is forgiven, unban 291031902831902831'],
      args: [
        {
          key: 'user',
          prompt: 'Who do you want to unban?',
          type: 'user',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to unban them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
    });
  }

  run(msg, { user, reason }) {

    msg.guild.members.unban(user, reason)
    .then(() => {
        const banEmbed = new MessageEmbed()
            .addField('Unbanned:', user)
            .addField('Reason', reason)
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter("© Spartan")
        msg.channel.send(banEmbed);
    })
  }
};