const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk')
module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick-member', 'throw'],
      memberName: 'kick',
      group: 'moderation',
      description: 'Kicks a tagged member',
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS'],
      args: [
        {
          key: 'userToKick',
          prompt: 'Who do you want to kick?',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to kick this user?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToKick, reason }) {
    console.log(chalk.cyan.bold(`Kick was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
    let user =
      message.mentions.members.first();
      message.guild.members.fetch(userToKick);
      if (user) {
        // Now we get the member from the user
        const member = message.guild.members.resolve(user);
      if (member) {
    member
    .kick(reason)
      .then(() => {
        const kickEmbed = new MessageEmbed()
          .addField('Kicked:', userToKick)
          .addField('Reason:', reason)
          .setColor('#2f3136')
          .setTimestamp()
      .setFooter("© Spartan")
        message.channel.send(kickEmbed);
      })
      .catch(e => {
        message.say(
          'Something went wrong when trying to kick this user, I probably do not have the permission to kick him'
        );
        return console.error(e);
      });
  }}}
};