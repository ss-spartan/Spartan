const Commando = require ('discord.js-commando')
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const chalk = require('chalk')

module.exports = class RoleInfoCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'roleinfo',
            group: 'roles',
            memberName: 'roleinfo',
            description: 'Get information about a role.',
            aliases: ['ri', 'rinfo'],
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            argsType: 'multiple',
        })
    }
async run (message, args){
    console.log(chalk.cyan.bold(`Role-Info was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))

if (!args[0]) return message.channel.send("Please enter a role.")
let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
if (!role) return message.channel.send("Please enter a valid role.");

const status = {
    false: "No",
    true: "Yes"
}

let roleembed = new MessageEmbed()
    .setColor("#2f3136")
    .setTitle("Information for the mentioned role:")
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
    .addField("**Name**", role.name, true)
    .addField("**Hex**", role.hexColor)
    .addField("❯ Users", stripIndents`
    • Users: **${role.members.size}**
    • Position: **${role.position}**
    `, true)
    .addField("**Mentionable**", status[role.mentionable])
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp()
      .setFooter("© Spartan")

message.channel.send(roleembed);
}
}