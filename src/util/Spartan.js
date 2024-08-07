const { SapphireClient, Events } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const connectDB = require("../database/db");
const axios = require('axios');

const TARGET_CHANNEL_ID = '1215575364873494618';

class SpartanClient extends SapphireClient {
    constructor() {
        super({
            caseInsensitiveCommands: true,
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
            loadDefaultErrorListeners: true,
            loadMessageCommandListeners: true
        });

        // Add message event listener
        this.on(Events.MessageCreate, this.handleMessage.bind(this));
    }

    async login(token) {
        await connectDB();
        return super.login(token);
    }

    async destroy() {
        return super.destroy();
    }

    async handleMessage(message) {
        if (message.author.bot) return;

        if (message.channel.id !== TARGET_CHANNEL_ID) return;

        const userMessage = message.content;

        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/openai-community/gpt2-large',
                {
                    inputs: userMessage,
                    parameters: {
                        max_length: 30,
                        temperature: 0.3,
                        top_p: 0.9,
                        top_k: 50
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            let answer = response.data?.[0]?.generated_text?.trim() || 'I couldn’t come up with an answer.';

            if (answer.includes(userMessage)) {
                answer = answer.replace(userMessage, '').trim();
            }

            answer = answer.split('. ')[0];

            const uniqueWords = [...new Set(answer.split(' '))];
            answer = uniqueWords.join(' ');

            if (answer.length < 5) {
                answer = "I'm not sure, but I'll find out.";
            }

            await message.reply(answer);
        } catch (err) {
            console.error('Error processing the request:', err);
            await message.reply('There was an error processing your request.');
        }
    }
}

module.exports = {
    SpartanClient
};
