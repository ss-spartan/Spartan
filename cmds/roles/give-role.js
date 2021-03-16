const { Command } = require('discord.js-commando')
const chalk = require('chalk')
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
            ]
        })
    }
    run(msg, { user, role }) {
        console.log(chalk.cyan.bold(`Give-Role was ran by:`, chalk.red.bold`${msg.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${msg.guild.name}`))

        msg.guild.member(user).roles.add(role)
        msg.say('**added** ' + role.name + ' **to** ' + user.tag)
 
    
    }
}