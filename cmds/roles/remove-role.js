const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const chalk = require('chalk')
module.exports = class removeRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name:"removerole",
            aliases: ["remove-role", "rrole", "rr"],
            group: 'roles',
            memberName: 'removerole',
            description: 'Removes a role from a user.',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to remove the role from?",
                    key:"user",
                },
                {
                    type:"role",
                    prompt:"Which role would you like to remove?",
                    key:"role"
                }
            ]
        })
    }
    run(msg, { user, role }) {

        if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.say("You don't have permission for this command.")
        msg.guild.member(user).roles.remove(role)
        msg.say('**removed** ' + role.name + ' **from** ' + user.tag)
 
    
    }
}