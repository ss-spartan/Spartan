const { Command } = require('discord.js-commando');
const chalk = require('chalk')
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
    });
  }

  run(message) {
    console.log(chalk.cyan.bold(`Loop was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
    if (!message.guild.musicData.isPlaying) {
      return message.say(':x: There is no song playing right now!');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say(':x: You cannot loop over a trivia!');
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `You must be in the same voice channel as the bot's in order to use that!`
      );
      return;
    }

    if (message.guild.musicData.loopSong) {
      message.guild.musicData.loopSong = false;
      message.channel.send(
        `**${message.guild.musicData.nowPlaying.title}** is no longer playing on repeat :repeat: `
      );
    } else {
      message.guild.musicData.loopSong = true;
      message.channel.send(
        `**${message.guild.musicData.nowPlaying.title}** is now playing on repeat :repeat: `
      );
    }
  }
};
