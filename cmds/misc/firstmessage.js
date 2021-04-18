const Commando = require("discord.js-commando")
const {MessageEmbed} = require ("discord.js")
const chalk = require('chalk')
module.exports = class FirstMessageCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'firstmessage',
            description: 'Get the first message on a channel.',
            memberName: 'firstmessage',
            aliases: ['fs', 'firstm'],
            group: 'misc',
            clientPermissions: ['MANAGE_WEBHOOKS'],
            userPermissions: ['MANAGE_MESSAGES'],
            argsType: 'multiple',
			throttling: {
                usages: 3,
                duration: 10
            },
        });
    }
    async run (message) {
	try {
		const messages = await message.channel.messages.fetch({ after: 1, limit: 1 });
		const fMessage = messages.first();
		const embed = new MessageEmbed()
			.setColor("#2f3136")
			.setThumbnail(fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setAuthor(fMessage.author.tag, fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(fMessage.content)
			.setTimestamp(fMessage.createdAt)
			.setFooter(`© Spartan`)
			.addField('❯ Jump', fMessage.url);
		message.channel.send(embed);
	} catch (e) {
		console.log(e);
	}}}