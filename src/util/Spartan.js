const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const connectDB = require("../database/db")

class SpartanClient extends SapphireClient {
    constructor() {
        super({
            caseInsensitiveCommands: true,
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
            loadDefaultErrorListeners: true,
            loadMessageCommandListeners: true
        });
    }

    async login(token) {
        await connectDB();
        return super.login(token);
    }

    async destroy() {
        return super.destroy();
    }

}
module.exports = {
    SpartanClient
};