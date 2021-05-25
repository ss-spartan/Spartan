const { MessageEmbed, Message } = require("discord.js");
const {
  Command
} = require("discord.js-commando")
const {
  Database
} = require("xen.db")
const db = new Database() /// u can use quick.db here xen.db work just the same as quick.db

module.exports = class SetLogsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'set-logs',
      aliases: [],
      group: 'setup',
      memberName: 'setlogs',
      description: "Set the log channel. Currently only possible to log: Deleted Messages.",
      userPermissions: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
      clientPermissions: ["MANAGE_CHANNELS"]
    });
  }

  async run(msg) {
    try {
      let channel = msg.mentions.channels.first();
      if (!channel) return msg.channel.send( new MessageEmbed().setDescription('>>> <:spartanWarning:839194405049991168> Please mention the channel you want to set the logs on.').setColor("YELLOW"))

      db.set(`guild_${msg.guild.id}`, channel.id)
      msg.channel.send(new MessageEmbed().setDescription(`>>> ✅ ${channel} has been set as the logs.`))
    } catch (e) {
      console.log(e)
    }
  }
}