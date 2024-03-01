const { Command } = require('discord.js-commando');
const {MessageEmbed} = require("discord.js");
module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      aliases: [`repeat`],
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Loop the currently playing song!',
      clientPermissions: ['SPEAK', 'CONNECT'],
      userPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 2,
        duration: 10
    },
    });
  }

  run(message) {

    if (!message.guild.musicData.isPlaying) {
      return message.channel.send(new MessageEmbed().setDescription(`> :x: ${message.author}, There is no song playing right now!`).setColor("RED"))
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.channel.send(new MessageEmbed().setDescription(`> :x: ${message.author}, You cannot loop over a trivia!`).setColor("RED"))
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.channel.send(new MessageEmbed().setDescription(`>
        You must be in the same voice channel as the bot's in order to use that!`
      ).setColor("YELLOW"))
      return;
    }

    if (message.guild.musicData.loopSong) {
      message.guild.musicData.loopSong = false;
      message.channel.send(new MessageEmbed().setDescription(`>
        ${message.author}, **${message.guild.musicData.nowPlaying.title}** is no longer playing on repeat. :repeat: `
      ).setColor("BLUE"))
    } else {
      message.guild.musicData.loopSong = true;
      message.channel.send(new MessageEmbed().setDescription(`>
       ${message.author}, **${message.guild.musicData.nowPlaying.title}** is now playing on repeat :repeat: `
      ).setColor("BLUE"));
    }
  }
};
