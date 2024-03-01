const { Command } = require('discord.js-commando');
const {MessageEmbed} = require("discord.js")
module.exports = class LoopQueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loopqueue',
      memberName: 'loopqueue',
      aliases: ['loop-queue', 'queue-loop'],
      group: 'music',
      description: 'Loop the queue x times! - (the default is 1 time)',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      userPermissions: ['SPEAK', 'CONNECT'],
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: 'How many times do you want to loop the queue?'
        }
      ],
      throttling: {
        usages: 3,
        duration: 10
    },
    });
  }

  run(message) {

    if (!message.guild.musicData.isPlaying) {
      message.channel.send(new MessageEmbed().setDescription(`> :x: ${message.author}, There is no song playing right now!`).setColor("RED"))
      return;
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      message.channel.send(new MessageEmbed().setDescription(`> :x: ${message.author}, You cannot loop over a trivia!`).setColor("RED"))
      return;
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.channel.send(new MessageEmbed().setDescription(`>
        :no_entry: ${message.author} You must be in the same voice channel as Spartan in order to use that!`
      ).setColor("RED"))
      return;
    } else if (message.guild.musicData.queue.length == 0) {
      message.channel.send(new MessageEmbed().setDescription(`> <:spartanWarning:839194405049991168> I can't loop over an empty queue!`).setColor("YELLOW"))
      return;
    } else if (message.guild.musicData.loopSong) {
      message.channel.send(new MessageEmbed().setDescription(`> <:spartanWarning:839194405049991168>
         Turn off the **loop** command before using the **loopqueue** command`
      ).setColor("YELLOW"))
      return;
    }

    if (message.guild.musicData.loopQueue) {
      message.guild.musicData.loopQueue = false;
      message.channel.send(new MessageEmbed().setDescription(`>
        :repeat: The queue is no longer playing on **loop**`
      ).setColor("BLUE"))
    } else {
      message.guild.musicData.loopQueue = true;
      message.channel.send(new MessageEmbed().setDescription(`> :repeat: The queue is now playing on **loop**`).setColor("BLUE"))
    }
  }
};
