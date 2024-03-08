const { EmbedBuilder } = require('discord.js');
const {Command} = require("@sapphire/framework")
const { storeUsername } = require('../models/userData'); // Assuming user.js is in the same directory

class SetFmCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'setfm',
            aliases: ['sfm'],
            fullCategory: 'General',
            description: 'Set your LASTFM username'
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('setfm')
                .setDescription(this.description)
                .addStringOption((option) =>
                    option
                        .setName('username')
                        .setDescription('Your Last.fm username')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {
        const username = interaction.options.getString('username');
        const userId = interaction.user.id;

        await storeUsername(userId, username);

        const embed = new EmbedBuilder()
            .setColor("#313238")
            .setDescription(`Your Last.fm username (**${username}**) has been set.`);
        await interaction.reply({ embeds: [embed] });
    }

};

module.exports = { SetFmCommand, name: 'setfm', description: 'Set your LASTFM username' }