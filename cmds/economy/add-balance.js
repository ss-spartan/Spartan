const economy = require('@features/economy')
const Commando = require('discord.js-commando')
const chalk =require('chalk')

module.exports = class AddBalanceCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'add-balance',
      group: 'economy',
      memberName: 'add-balance',
      description: 'Adds balance to a user',
      clientPermissions: ['ADMINISTRATOR'],
      ownerOnly: true,
      argsType: 'multiple',
    })
  }
  async run(message, args) {
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to add coins to.')
      return
    }
    console.log(chalk.cyan.bold(`Balance was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))

    const coins = args[1]
    if (isNaN(coins)) {
      message.reply('Please provide a valid numnber of coins.')
      return
    }
    console.log(chalk.cyan.bold(`Balance was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.reply(
      `You have given <@${userId}> ${coins} coin(s). They now have ${newCoins} coin(s)!`,
      console.log(chalk.cyan.bold(`Add-Balance was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
    )
  }
}