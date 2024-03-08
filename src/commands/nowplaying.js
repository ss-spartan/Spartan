const { Command } = require('@sapphire/framework');
const LastfmService = require('../util/SpartanFMService');
const { EmbedBuilder } = require("discord.js");
const lastfmService = new LastfmService(process.env.LASTFM_API, process.env.LASTFM_API_SECRET);

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
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {
        try {
            const lastfmUsername = interaction.options.getString('username');
            const tracks = await lastfmService.getRecentTracks(lastfmUsername);

            const nowPlayingTrack = tracks.find((track) => track['@attr']?.nowplaying === 'true');

            if (!nowPlayingTrack) {
                const embed = new EmbedBuilder()
                    .setColor("#313238")
                    .setDescription(`${lastfmUsername} doesn't seem to have anything playing right now.`);
                return await interaction.reply({ embeds: [embed] });
            }

            const artistName = nowPlayingTrack.artist['#text'];
            const trackName = nowPlayingTrack.name;
            const albumName = nowPlayingTrack.album['#text'];
            const albumUrl = nowPlayingTrack.url;
            const smallImageUrl = nowPlayingTrack.image[1]['#text'];
            const userProfileUrl = `https://www.last.fm/user/${lastfmUsername}`;


            const embed = new EmbedBuilder()
                .setTitle(`${lastfmUsername}`)
                .setURL(userProfileUrl)
                .setColor("#313238")
                .setDescription(`artist: **[${artistName}](${albumUrl})**\nsong: **[${(trackName)}](${albumUrl})**`, true)
                .setThumbnail(smallImageUrl)

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor("#313238")
                .setDescription('An error occurred while fetching Last.fm data.');
            return await interaction.reply({ embeds: [embed] });
        }
    }
}

module.exports = { NowPlayingCommand, name: 'fmnow', description: 'Get the currently playing song from this Last.fm user' };
