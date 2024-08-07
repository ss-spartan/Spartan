const { Command } = require("@sapphire/framework");
const { EmbedBuilder } = require('discord.js');

class BotInfoCommand extends Command {
    constructor(context) {
        super(context, {
            name: 'botinfo',
            fullCategory: 'General',
            description: 'Get information about the bot.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
        );
    }

    async chatInputRun(interaction) {
        try {
            const totalServers = this.container.client.guilds.cache.size;
            const totalUsers = this.container.client.users.cache.size;
            const botUptime = this.container.client.uptime; // Uptime in milliseconds
            const botCreationDate = this.container.client.user.createdAt;
            const botAvatarURL = this.container.client.user.displayAvatarURL();

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: this.container.client.user.username,
                    iconURL: botAvatarURL
                })
                .setColor('#313238')
                .addFields(
                    { name: 'Servers', value: totalServers.toString(), inline: true },
                    { name: 'Users', value: totalUsers.toString(), inline: true },
                    { name: 'Uptime', value: this.msToTime(botUptime), inline: true },
                    { name: 'Creation Date', value: botCreationDate.toDateString(), inline: true }
                );

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }

    msToTime(duration) {
        const milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            days = Math.floor(duration / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}.${milliseconds}s`;
    }
}

module.exports = {
    BotInfoCommand,
    name: 'botinfo',
    description: "Get information about the bot."
};
