const { Command } = require('@sapphire/framework');
const SpartanFMService = require('../util/SpartanFMService');
const {getUsername} = require("../models/userData")
const { EmbedBuilder } = require("discord.js");

class NowPlayingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'fmnow',
            aliases: ['now', 'np'],
            fullCategory: 'General',
            description: 'Get the currently playing song from this Last.fm user',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('fmnow')
                .setDescription(this.description)
                .addStringOption((option) =>
                    option
                        .setName('username')
                        .setDescription('Get the currently playing song from this Last.fm user')
                        .setRequired(false)
                )
        );
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

            const tracks = await SpartanFMService.getRecentTracks(username);

            const nowPlayingTrack = tracks.find((track) => track['@attr']?.nowplaying === 'true');

            if (!nowPlayingTrack) {
                const embed = new EmbedBuilder()
                    .setColor("#2B2C31")
                    .setDescription('You don\'t seem to have anything playing right now.'); // Updated message
                return await interaction.reply({ embeds: [embed] });
            }

            const artistName = nowPlayingTrack.artist['#text'];
            const trackName = nowPlayingTrack.name;
            const albumUrl = nowPlayingTrack.url;
            const smallImageUrl = nowPlayingTrack.image[2]['#text'];
            const userProfileUrl = `https://www.last.fm/user/${username}`;


            const embed = new EmbedBuilder()
                .setTitle(`${username}`)
                .setURL(userProfileUrl)
                .setColor("#2B2C31")
                .setDescription(`artist: **[${artistName}](${albumUrl})**\nsong: **[${(trackName)}](${albumUrl})**`, true)
                .setThumbnail(smallImageUrl)

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor("#2B2C31")
                .setDescription('An error occurred while fetching Last.fm data.');
            return await interaction.reply({ embeds: [embed] });
        }
    }
}

module.exports = { NowPlayingCommand, name: 'fmnow', description: 'Get the currently playing song from this Last.fm user' };
