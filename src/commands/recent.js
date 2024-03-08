const { Command } = require('@sapphire/framework');
const LastfmService = require('../util/SpartanFMService');
const { EmbedBuilder } = require("discord.js");
const { getUsername } = require('../models/userData');

class RecentCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'fmrecent',
            aliases: ['fr'],
            fullCategory: 'General',
            description: 'Get this Last.fm user\'s recent tracks'
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description).addStringOption((option) =>
                option
                    .setName('username')
                    .setDescription('Get this Last.fm user\'s recent tracks')
                    .setRequired(false)
            )
        )
    }

   async chatInputRun(interaction) {
        try {
            const userId = interaction.user.id;

            const username = await getUsername(userId);

            if (!username) {
                const embed = new EmbedBuilder()
                    .setColor("#2B2C31")
                    .setDescription('You haven\'t set your Last.fm username yet! Use `/setfm <username>` to link your account.');
                return await interaction.reply({ embeds: [embed] });
            }

            const tracks = await LastfmService.getRecentTracks(username);

            if (!tracks.length) {
                const embed = new EmbedBuilder()
                    .setColor("#2B2C31")
                    .setDescription(`No recent tracks found for ${username}`);
                return await interaction.reply({ embeds: [embed] });
            }

            const response = tracks.slice(0, 9).map((track) => `- **[${track.artist['#text']}](${track.url}) - ${track.name}**`).join('\n');

            const embed = new EmbedBuilder()
                .setColor("#2B2C31")
                .setTitle(`${username} 's recent tracks:`)
                .setDescription(response)
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor("#2B2C31")
                .setDescription('Hey! There might be an issue. Try again later.');
            return await interaction.reply({ embeds: [embed] });
        }
    }
}

module.exports = { RecentCommand, name: 'fmrecent', description: 'Get this Last.fm user\'s recent tracks' };
