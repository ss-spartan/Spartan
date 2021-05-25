const {
    Command
} = require("discord.js-commando")


module.exports = class Test7Command extends Command {
    constructor(client) {
        super(client, {
            name: 'yo',
            aliases: ['ggwp'],
            group: 'dev',
            memberName: 'yo',
            description: 'hehe',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            ownerOnly: true,
            hidden: true,
            examples: ['ape'],
            throttling: {
                usages: 1,
                duration: 10
            },
        });
    }

    async run(message, args) {
try{
        message.channel.messages.fetch({
            limit: 100 // Change `100` to however many messages you want to fetch
        }).then((messages) => { 
            const botMessages = [];
            messages.filter(m => m.author.id === "275240603447721984").forEach(msg => botMessages.push(msg))
            message.channel.bulkDelete(botMessages).then(() => {
                message.channel.send("ok daddy").then(msg => msg.delete({
                    timeout: 3000
                }))
            })
        })}catch(e){
            console.log(e)
        }}
    }