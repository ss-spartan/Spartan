const { Command } = require('discord.js-commando')
const chalk = require('chalk')
const { Message } = require('discord.js')
module.exports = class GiveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name:"giverole",
            aliases: ["addrole", "arole", "gr"],
            group: 'roles',
            memberName: 'giverole',
            description: 'Adds a role to a user.',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            clientPermissions: ['MANAGE_ROLES'],
      
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to add the role to?",
                    key:"user",
                },
                {
                    type:"role",
                    prompt:"Which role would you like to add?",
                    key:"role"
                }
            ],
            throttling: {
                usages: 3,
                duration: 10
            },
        })
    }
    run(msg, { user, role }) {
        if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.say("> <:Spartan:824723825597480978> You don't have permission for this command.")
        msg.guild.member(user).roles.add(role)
        msg.say(`> <:Spartan:824723825597480978> added **${role.name}** to <@${user.id}>`)
        msg.delete({timeout:10000})
        
    
    }
}