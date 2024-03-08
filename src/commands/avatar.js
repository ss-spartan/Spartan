const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require("discord.js")

class AvatarCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'avatar',
            aliases: ['av'],
            fullCategory: 'General',
            description: 'Get a users avatar!',
            options
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description).addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Get this users avatar')
            )
        )
    }

    async chatInputRun(interaction) {
        try {
            const user = interaction.options.getUser('user', false) || interaction.user;

            const embed = new EmbedBuilder()
                .setImage(user.displayAvatarURL({ size: 2048 }))
                .setColor("#2B2C31")

            return interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.log(err);
        }
    }

}
module.exports =  {AvatarCommand, name:'avatar', description: 'avatar'}