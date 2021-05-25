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

  async run(message, args, client) {
    try {
      const msg = db.get(`msg_${message.channel.id}`)
      if (!msg) {
        return message.channel.send(`There was nothing to snipe.`)
      }
      let embed = new Discord.MessageEmbed()
        .setAuthor(msg.author)
        .setDescription(msg.content)
        .setFooter(" sniped by" + ' ' + message.author.tag)
        .setColor("#2f3136")
        .setTimestamp(msg.time)
        if (msg.image) embed.setImage(msg.image);
      return message.channel.send(embed)
    } catch (e) {
      console.log(e)
    }
  }
}