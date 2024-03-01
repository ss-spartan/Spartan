const { Command } = require('discord.js-commando');
const chalk = require('chalk')
const {MessageEmbed} = require("discord.js")
module.exports = class JoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      memberName: 'join',
      aliases: ['summon'],
      group: 'music',
      guildOnly: true,
      userPermissions: ['SPEAK', 'CONNECT'],
      description:
        'Allows an Admin to summon the bot to your voice-channel when music is playing.',
        throttling: {
          usages: 1,
          duration: 10
      },
    });
  }

  async run(message) {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.channel.send(new  MessageEmbed().setDescription(`:no_entry: ${message.author}, Please join a voice channel and try again!`).setColor("RED"));
      return;
    }
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.channel.send(new MessageEmbed().setDescription(`:x: ${message.author}, Please try after the trivia has ended!`).setColor("RED"))
      return;
    }
    if(message.client.voice.channel == true){
      message.channel.send("Im already in a voice channel. Sorry.")
    }
    try {
      await voiceChannel.join();
      return;
    } catch {
      message.channel.send(new MessageEmbed().setDescription(`:x ${message.author} Something went wrong when moving channels.`).setColor("RED"))
      return;
    }
  }
};
