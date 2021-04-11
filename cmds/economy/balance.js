const economy = require('@features/economy')
const Commando = require('discord.js-commando')
const chalk = require("chalk")

module.exports = class BalanceCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'balance',
      group: 'economy',
      memberName: 'balance',
      description: 'Display yours or someone else\'s balance',
      aliases: ['bal'],
      clientPermissions: ['SEND_MESSAGES'],
      userPermissionss: ['SEND_MESSAGES'],
    })
  }

  async run(message) {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    message.reply(`That user has ${coins} coins!`)
  }
}
