const { Command } = require('discord.js-commando');
const chalk = require('chalk')
module.exports = class JoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      memberName: 'join',
      aliases: ['summon'],
      group: 'music',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      userPermissions: ['SPEAK', 'CONNECT'],
      description:
        'Allows an Admin to summon the bot to your voice-channel when music is playing.'
    });
  }

  async run(message) {
    console.log(chalk.cyan.bold(`Join was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Please join a voice channel and try again!');
      return;
    }
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.reply(':x: Please try after the trivia has ended!');
      return;
    }
    if (message.guild.musicData.isPlaying != true) {
      message.reply(':x: Nothing is Playing');
      return;
    }
    try {
      await voiceChannel.join();
      return;
    } catch {
      message.reply(':x Something went wrong when moving channels');
      return;
    }
  }
};