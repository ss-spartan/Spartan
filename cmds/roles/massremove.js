const {
    Command
} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class MassRemCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'massrem',
            guildOnly: true,
            aliases: ['mr', 'remroleall', 'remroleall'],
            group: 'roles',
            memberName: 'massrem',
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            description: 'Removes the role from everyone on the server!',
            details: 'This will take time depending on the server size.',
            examples: [',massrem [role]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                key: 'role',
                prompt: 'Please provide me a role to remove!',
                type: 'role'
            }]
        });
    }

    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("> <:Spartan:824723825597480978> You don't have permission for this command.")
        const {
            role
        } = args;
        const members = await message.guild.members.fetch()
        await message.channel.send(`<:spartan2:824723824502243409> Removing the **${role.name}** role from **${members.size}** members...this might take a while...`)
        await members.forEach(m => m.roles.remove(role))
        await message.channel.send(`> <:Spartan:824723825597480978> ${role.name} has been removed from everyone.`).then(message => message.delete({
            timeout: 50000
        }))

        message.delete({
            timeout: 60000
        })
    }
}