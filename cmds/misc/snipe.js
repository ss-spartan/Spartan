const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js')
const db = require('quick.db')



module.exports = class SnipeCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'snipe',
      aliases: ['s'],
      group: 'moderation',
      memberName: 'snipe',
      description: 'Snipe the last deleted message.',
      guildOnly: true,
      guarded: true
    });
  }


  //eslint-disable-next-line class-methods-use-this
  async run(message, args, client) {
    try {
      let msg = await db.get(`msg_${message.channel.id}`)
      if (!msg) {
          return message.channel.send(`There was nothing to snipe.`)
      }
      let author = await db.get(`author_${message.channel.id}`)
      let icon = message.guild.iconURL()
      let embed = new Discord.MessageEmbed()
          .setAuthor(message.client.users.cache.get(author).tag, message.client.users.cache.get(author).displayAvatarURL({ dynamic: true}))
          .setDescription(msg)
          .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
          .setColor("#2f3136")
      message.channel.send(embed)

    } catch (e) {
      console.log(e)
    }
  }
}