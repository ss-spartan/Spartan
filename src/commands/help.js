const { Command } = require("@sapphire/framework")
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

class HelpCommand extends Command {
    constructor(context) {
        super(context, {
            name: 'help',
            fullCategory: 'General',
            description: 'Get information about the bot and its commands.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
        );
    }

    async chatInputRun(interaction) {
        try {
            const commands = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
            const embed = new EmbedBuilder()
                .setColor('#313238')
                .setTitle('Spartan Commands');

            for (const file of commands) {
                const command = require(`./${file}`);
                embed.addFields({
                    name: command.name,
                    value: command.description || 'No description provided.',
                });
            }

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    HelpCommand,
    name: 'help',
    description: "Get information about the bot and its commands."
};
