const { Command } = require('discord.js-commando');
const db = require('quick.db');
const chalk = require('chalk')
module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume', 'v', 'vol'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Adjust song volume!',
      clientPermissions: ['SPEAK', 'CONNECT'],
      userPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt:
            ':loud_sound: What volume would you like to set? from 1 to 200!',
          type: 'integer',
          // default: 25,
          validate: function(wantedVolume) {
            return wantedVolume >= 1 && wantedVolume <= 200;
          }
        }
      ]
    });
  }

  run(message, { wantedVolume }) {
    console.log(chalk.cyan.bold(`Volume was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
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
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    db.set(`${message.member.guild.id}.serverSettings.volume`, volume );
    message.guild.musicData.songDispatcher.setVolume(volume);
    message.say(`:loud_sound: Setting the volume to: ${wantedVolume}%!`);
  }
};
