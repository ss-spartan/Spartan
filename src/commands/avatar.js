const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require("discord.js")
// import { colors } from 'config.json'

class AvatarCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'avatar',
            aliases: ['av'],
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
                .setImage(user.displayAvatarURL())
                .setColor("#313238")

            return interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.log(err);
        }
    }

}
module.exports = {
    AvatarCommand
};