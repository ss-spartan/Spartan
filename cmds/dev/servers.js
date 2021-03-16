const {Command} = require("discord.js-commando"),
 Discord = require("discord.js");
 const chalk = require('chalk')
module.exports = class Servers extends Command {

	constructor (client) {
		super(client, {
			name: "servers",
			group:'dev',
			enabled: true,
            description: 'Get a list of Spartan Serevers',
			guildOnly: false,
            memberName: 'servers',
			aliases: [ "slist" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: true,
			cooldown: 5000
		});
	}

	async run (message, args, data) {
		console.log(chalk.cyan.bold(`Servers was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        try{
		await message.delete();

		let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description = 
        `**SERVERS:** __${this.client.guilds.cache.size}__\n\n`+
		this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `**${i + 1}** - **${r.name}** | ${r.memberCount} MEMBERS  ||(${message.guild.id})|| `.toLowerCase())
			.slice(0, 10)
			.join("\n");

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setColor('#2f3136')
			.setFooter(this.client.user.username)
			.setTitle(`PAGE: ${page}/${Math.ceil(this.client.guilds.cache.size/10)}`)
			.setDescription(description);

		const msg = await message.channel.send(embed);
        
		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				// Updates variables
				i0 = i0-10;
				i1 = i1-10;
				page = page-1;
                
				// if there is no guild to display, delete the message
				if(i0 < 0){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}
                
				description = `**SERVERS:** __${this.client.guilds.cache.size}__\n\n`+
				this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - **${r.name}** | ${r.memberCount} MEMBERS  ||(${message.guild.id})|| `)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`PAGE: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit(embed);
            
			}

			if(reaction._emoji.name === "➡"){

				// Updates variables
				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				// if there is no guild to display, delete the message
				if(i1 > this.client.guilds.cache.size + 10){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `**SERVERS:** __${this.client.guilds.cache.size}__\n\n`+
				this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - **${r.name}** | ${r.memberCount} MEMBERS  ||(${message.guild.id})|| `.toLowerCase())
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`PAGE: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit(embed);

			}

			if(reaction._emoji.name === "❌"){
				return msg.delete(); 
			}

			// Remove the reaction when the user react to the message
			await reaction.users.remove(message.author.id);

		});
	} catch(e){
        console.log(e)
    }

    }}