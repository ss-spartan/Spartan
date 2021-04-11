

const {
  Command
} = require('discord.js-commando')
const chalk = require('chalk')

module.exports = class ListBans extends Command {
  constructor(client) {
    super(client, {
      name: "list-bans",
      description: "DMs you a list of banned users.",
      group: "moderation",
      usage: "list-bans",
      memberName: 'list-bans',
      aliases: ["banlist"],
      guildOnly: true,
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
    });
  }

  async run(message) {

    message.guild.fetchBans()
      .then(bans => {
        const obj = bans.map(b => ({
          user: `**${b.user.tag}**`
        }));
        const bList = Array.from(obj);
        if (bList.length < 1) return message.author.send(`There are no banned users on **${message.guild.name}**.`);
        let index = 0;

        message.author.send(`__**Ban List for ${message.guild.name}**__\n${bList.map(bl => `**${++index} -** ${bl.user}`).join("\n")}`);
        message.react("✅");
      });
  }
}