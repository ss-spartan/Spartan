const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando")
const {
    Database
  } = require("xen.db")
  const db = new Database()

module.exports = class AutoRoleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'autorole',
                description: 'Enable an auto-role for new members. `NOTE: You won\'t be able to turn this off yet.`',
                group: 'setup',
                memberName: 'autorole',
                userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD"],
                clientPermissions: ["SEND_MESSAGES"],
                throttling: {
                    usages: 2,
                    duration: 10
                }});
            }

            async run (message) {
        try{
            let r = message.mentions.roles.first();
            if(!r) return message.channel.send(new MessageEmbed().setDescription(`>>> <:spartanWarning:839194405049991168> ${message.author}, **Please mention a role!**`).setColor("YELLOW"))
            await db.set(`autorole_${message.guild.id}`, r.id)
            message.channel.send(new MessageEmbed().setDescription(`>>> ✅ ${message.author}, **Set autorole as - \`${r.name}\`!**`).setColor("GREEN"))
            }catch(e){
                console.log(e)
            }
        }}