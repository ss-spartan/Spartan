const {Command} = require('discord.js-commando')
const chalk = require('chalk')
module.exports = class MassAddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'massadd',
            guildOnly: true,
            aliases: ['ma', 'addroleall', 'roleall'],
            group: 'roles',
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            memberName: 'massadd',
            description: 'Adds the role to everyone on the server!',
            details: 'This will take time depending on the server size.',
            examples: [',massadd [role]'],
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [{
                key: 'role',
                prompt: 'Please provide me a role to add!',
                type: 'role'
            }]
        });
    }

    async run(message, args) {

        if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.say("You don't have permission for this command.")
        const { role } = args;
        const members = await message.guild.members.fetch()
        const msg = await message.channel.send(`<:spartan2:824723824502243409> Adding the **${role.name}** role to **${members.size}** members... this might take a while...`)
        await members.forEach(m => m.roles.add(role))
        await msg.channel.send('All roles have been added.')

        msg.delete({timeout: 60000})
    }}