require('module-alias/register')
require('dotenv').config();

const Discord = require('discord.js')
// const client = new Discord.Client()

const path = require('path')
const Commando = require('discord.js-commando')
const config = require('@root/config.json')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')
const mongo = require('@util/mongo')
const {
  Structures
} = require('discord.js');
const prefix = require('./config.json')
const moment = require('moment')
const {
  fromNow
} = require('./util/util')
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
const explicitContentFilters = ['None', 'Scan messages from those without a role', 'Scan all messages']

const events = require("events");
const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(300); // Listeners
// Customizations
const {

  greenBright,
  red,
  bgRed,

} = require('chalk');

const {
  Intents
} = require("discord.js");
const intents = new Intents([
  Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
  "GUILD_MEMBERS", // lets you request guild members (i.e. fixes the issue)
  "GUILD_PRESENCES"
]);

Structures.extend('Guild', function (Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        skipTimer: false, // only skip if user used leave command
        loopSong: false,
        loopQueue: false,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});


const client = new Commando.CommandoClient({
  owner: '275240603447721984',
  commandPrefix: config.prefix,
  ws: {
    intents
  },
  unknownCommandResponse: false
})


client.on('ready', async () => {
  const statusList = [{
      msg: "ss-spartan.github.io",
      type: "WATCHING"
    },
    {
      msg: "oh yeah you can see my commands with ,help",
      type: "LISTENING"
    },
  ];


  setInterval(async () => {
    const index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type,
    });
  }, 60000);

  await mongo().then(mongoose => {
    try {
      console.log('Connected to mongo!')
    } finally {
      mongoose.connection.close()
    }

  })

  client.on('voiceStateUpdate', async (___, newState) => {
    if (
      newState.member.user.bot &&
      !newState.channelID &&
      newState.guild.musicData.songDispatcher &&
      newState.member.user.id == client.user.id
    ) {
      newState.guild.musicData.queue.length = 0;
      newState.guild.musicData.songDispatcher.end();
      return;
    }
    if (
      newState.member.user.bot &&
      newState.channelID &&
      newState.member.user.id == client.user.id &&
      !newState.selfDeaf
    ) {
      newState.setSelfDeaf(true);
    }
  });
  client.on("guildCreate", async guild => {
    // This event triggers when the bot joins a guild.
    console.log(``);
    console.log(greenBright(`[GUILD JOINED] ${guild.name} | [ID] ${guild.id} | [ (+) MEMBERCOUNT: ${guild.memberCount}]`));
    console.log(``);
  });
})

const chalk = require("chalk")
client.on('commandRun', (cmd, promise, msg) => {
  if (msg.guild !== null) {
    console.log(chalk.cyan.bold(`Running`, chalk.red.bold `${cmd.name}`, chalk.yellow.bold(`in`), `${msg.guild.name}`, chalk.red.bold(`by`), `${msg.author.tag}`))
  }
})
client.on('disconnect', event => {
  client.logger.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
  process.exit(0);
});
const db =require("quick.db")
client.on('messageDelete', async message => {
  db.set(`msg_${message.channel.id}`, message.content)
  db.set(`author_${message.channel.id}`, message.author.id)
})

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.get('830113325584613436');
  const youroles = member.guild.channels.cache.get('830116181825945600')
  const coloroles = member.guild.channels.cache.get('830116603155709983')
  if (!channel) return;

  channel.send(`welcome to ecstasy ${member.user} check out ${youroles} and ${coloroles} for roles.`)
});









client.on('guildCreate', function (guild, message) {
  var channel = client.channels.cache.get('824723828713324584');

  var online = guild.members.cache.filter(m => m.user.presence.status === "online").size;
  var bots = guild.members.cache.filter(m => m.user.bot).size;

  var textChannels = guild.channels.cache.filter(c => c.type === 'text');
  var voiceChannels = guild.channels.cache.filter(c => c.type === 'voice');

  const embed = new Discord.MessageEmbed()
    .setAuthor(`Added to ${guild.name}!`, guild.iconURL())
    .setDescription(`Server infomation for **${guild.name}**`)
    .setColor('GREEN')
    .setThumbnail(guild.iconURL())
    .setDescription(`**Owner:** <@${guild.ownerID}>`)
    .addField('❯\u2000\Information', `•\u2000\**ID:** ${guild.id}**\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} \`(${fromNow(guild.createdAt)})\`\n\•\u2000\**Region:** ${guild.region}\n\u2000\**`)
    .addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${guild.channels.cache.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles:** ${guild.roles.cache.size}`, true)
    .addField('❯\u2000\Miscellaneous', `•\u2000\**Emojis:** ${guild.emojis.cache.size}`, true)
    .setTimestamp()
    .setFooter(`(${client.guilds.cache.size})`);
  return channel.send({
    embed
  });
});

client.on('guildDelete', function (guild, message) {
  var channel = client.channels.cache.get('824723828713324584');

  var online = guild.members.cache.filter(m => m.user.presence.status === "online").size
  var bots = guild.members.cache.filter(m => m.user.bot).size

  var textChannels = guild.channels.cache.filter(c => c.type === 'text');
  var voiceChannels = guild.channels.cache.filter(c => c.type === 'voice');

  const embed = new Discord.MessageEmbed()
    .setAuthor('Removed from a Server!', guild.iconURL())
    .setColor('RED')
    .setThumbnail(guild.iconURL())
    .setDescription(`Server infomation for **${guild.name}** || **Owner:** <@${guild.ownerID}>`)
    .addField('❯\u2000\Information', `•\u2000\**ID:** ${guild.id}**\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} \`(${fromNow(guild.createdAt)})\`\n\•\u2000\**Region:** ${guild.region}\n\u2000\**`)
    .addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${guild.channels.cache.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles:** ${guild.roles.cache.size}`, true)
    .addField('❯\u2000\Miscellaneous', `•\u2000\**Emojis:** ${guild.emojis.cache.size}`, true)
    .setTimestamp()
    .setFooter(`(${client.guilds.cache.size})`);
  return channel.send({
    embed
  });
});


client.registry
  .registerGroups([
    ['misc', 'Misc Commands'],
    ['moderation', 'Moderation Commands'],
    ['economy', 'Economy Commands'],
    ['setup', 'Set-up commands'],
    ['roles', 'Role Configuration'],
    ['action', 'Interactive Commands'],
    ['info', 'Info Commands'],
    ['music', 'Music Commands'],
    ['dev', 'Developer Commands']
  ])
  .registerDefaults({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, 'cmds'))

commandBase.loadPrefixes(client)
loadCommands(client)
loadFeatures(client)

client.login(config.token)