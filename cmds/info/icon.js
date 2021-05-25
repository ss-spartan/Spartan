const Commando = require('discord.js-commando')
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk')

module.exports = class IconCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "icon",
      description: "Sends the current servers icon.",
      group: "info",
      memberName: 'icon',
      usage: "icon",
      aliases: ["server-icon", "guild-icon", "sicon"],
      argsType:'multiple',
      clientPermissions: ["EMBED_LINKS"],
            userPermissions: ['SEND_MESSAGES'],
            throttling: {
              usages: 3,
              duration: 10
          },
    });
  }

  async run(message) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

    const icon = message.guild.iconURL({
      format: 'png',
      size: 2048,
      dynamic: true,
    });

    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setTitle(`Server icon of ${message.guild.name}`)
      .setImage(icon);
    message.channel.send({ embed });

  }
}

