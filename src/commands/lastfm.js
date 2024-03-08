const { Command } = require('@sapphire/framework');
const LastfmService = require('../util/SpartanFMService');
const { EmbedBuilder } = require("discord.js");

const lastfmService = new LastfmService(process.env.LASTFM_API, process.env.LASTFM_API_SECRET);

class LastfmCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'fm',
            aliases: ['fm'],
            fullCategory: 'General',
            description: 'Get this Last.fm user\'s recent tracks'
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('fm').setDescription(this.description).addStringOption((option) =>
                option
                    .setName('username')
                    .setDescription('Get this Last.fm user\'s recent tracks')
                    .setRequired(true)
            )
        )
    }

    async chatInputRun(interaction) {
        try {
            const lastfmUsername = interaction.options.getString('username');
            const tracks = await lastfmService.getRecentTracks(lastfmUsername);

            if (!tracks.length) {
                const embed = new EmbedBuilder()
                    .setColor("#313238")
                    .setDescription(`No recent tracks found for ${lastfmUsername}`);
                return await interaction.reply({ embeds: [embed] });
            }

            const response = tracks.slice(0, 9).map((track) => `**[${track.artist['#text']}](${track.url}) - ${track.name}**`).join('\n');

            const embed = new EmbedBuilder()
                .setColor("#313238")
                .setTitle(`${ lastfmUsername } 's recent tracks:`)
                .setDescription(response)
             // .setImage(smallImageUrl);
        await interaction.reply({ embeds: [embed] });
    } catch(error) {
        console.error(error);
        const embed = new EmbedBuilder()
            .setColor("#313238")
            .setDescription('Hey! It seems like this account doesn\'t exist!\n Please go to **[Last.FM](https://www.last.fm/)** to create one, and don\'t forget to link your spotify!');
        return await interaction.reply({ embeds: [embed] });
    }
}

}

module.exports = { LastfmCommand, name: 'fm', description: 'Get this Last.fm user\'s recent tracks' };
