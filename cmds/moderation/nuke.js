
const {Command} = require('discord.js-commando')

module.exports = class NukeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nuke',
            group: 'moderation',
            memberName: 'nuke',
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS', "MANAGE_GUILD"],
            description: 'Clones the current channel.',
            throttling: {
                usages: 1,
                duration: 15
            },
        });
    }
    async run(message, client, args ){

    message.channel.clone().then
    ((ch) => {
        ch.setParent(message.channel.parent);
        ch.setPosition(message.channel.position);
        message.channel.delete().then(() => {
            ch.send("**Channel Has Been Nuked** \n https://imgur.com/LIyGeCR").then(r => r.delete({ timeout: 5000}))
        })

    });
}
}