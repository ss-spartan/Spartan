const {  Command } = require('@sapphire/framework');
const fetch = require('node-fetch');

class AICommand extends Command {
    constructor(context) {
        super(context, {
            name: 'ai',
            fullCategory: 'General',
            description: 'Ask the bot any question.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name)
                .setDescription(this.description)
                .addStringOption(option =>
                    option.setName('question')
                        .setDescription('The question you want to ask')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {
        const question = interaction.options.getString('question');

        try {
            const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2-large', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: question,
                })
            });

            const data = await response.json();
            console.log(data);  // For debugging

            if (!data || !data.length) {
                return interaction.reply({ content: 'I couldn’t come up with an answer.', ephemeral: true });
            }

            const rawText = data[0]?.generated_text?.trim() || '';
            const cleanText = rawText.split('\n')[0];  // Adjust as needed

            return interaction.reply({ content: cleanText || 'I couldn’t come up with an answer.', ephemeral: false });
        } catch (err) {
            console.error('Error processing the request:', err);
            return interaction.reply({ content: 'There was an error processing your request.', ephemeral: true });
        }
    }
}

module.exports = {
    AICommand,
    name: 'ai',
    description: "Ask the bot any question."
};

