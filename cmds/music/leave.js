const { Command } = require('discord.js-commando');
const {MessageEmbed} = require("discord.js")
module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Leaves voice channel if in one!',
      userPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 3,
        duration: 10
    },
    });
  }

  run(message) {

    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.channel.send(new MessageEmbed().setDescription(`> :no_entry: ${message.author}, Please join a voice channel and try again!`).setColor("RED"))
      return;
    } else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      if (
        message.guild.musicData.isPlaying == false &&
        message.guild.me.voice.channel
      ) {
        message.guild.me.voice.channel.leave();
      } else {
        message.channel.send(new MessageEmbed().setDescription(`> <:spartanWarning:839194405049991168> ${message.author}, There is no song playing right now!`).setColor("YELLOW"))
      }
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.channel.send(new MessageEmbed().setDescription(
        `> :no_entry: ${message.author}, You must be in the same voice channel as Spartan in order to use that!`
      ).setColor("RED"))
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      message.guild.musicData.songDispatcher.resume();
      message.guild.musicData.queue.length = 0;
      message.guild.musicData.loopSong = false;
      setTimeout(() => {
        message.guild.musicData.songDispatcher.end();
      }, 100);
      return message.channel.send(new MessageEmbed().setDescription(
        `> :grey_exclamation: ${message.author},  ${this.client.user.username} has left the channel.`
      ).setColor("GREY"))
    } else {
      message.guild.musicData.queue.length = 0;
      message.guild.musicData.skipTimer = true;
      message.guild.musicData.loopSong = false;
      message.guild.musicData.loopQueue = false;
      message.guild.musicData.songDispatcher.end();
      return message.channel.send(new MessageEmbed().setDescription(
        `:grey_exclamation: ${message.author},  ${this.client.user.username} has left the channel.`
      ).setColor("GREY"))
    }
  }
};
