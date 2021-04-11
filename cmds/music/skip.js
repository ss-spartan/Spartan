const { Command } = require('discord.js-commando');
const chalk = require('chalk')
module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song', 'next'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song!',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      userPermissions: ['SPEAK', 'CONNECT'],
    });
  }

  run(message) {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply(
        ':no_entry: Please join a voice channel and try again!'
      );

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply(':x: There is no song playing right now!');
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: You must be in the same voice channel as the bot's in order to use that!`
      );
      return;
    } else if (message.guild.triviaData.isTriviaRunning) {
      return message.reply(`You can't skip a trivia! Use ${prefix}end-trivia`);
    }
    message.guild.musicData.loopSong = false;
    message.guild.musicData.songDispatcher.end();
  }
};
