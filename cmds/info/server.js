const {
    Command
} = require('discord.js-commando');
const moment = require('moment');
const {
    stripIndents
} = require('common-tags');
const chalk = require('chalk')

const humanLevels = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: '(╯°□°）╯︵ ┻━┻',
    4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = class ServerInfoCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'server-info',
        aliases: ['server'],
        group: 'info',
        memberName: 'server',
        description: 'Get info on the server.',
        details: `Get detailed information on the server.`,
        argsType: 'multiple',
        userPermissions: ['SEND_MESSAGES'],
        clientPermissions: ["EMBED_LINKS"],
      });
  
    }
  

    run(msg) {
      console.log(chalk.cyan.bold(`Server-info was ran by:`, chalk.red.bold`${msg.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${msg.guild.name}`))
        return msg.embed({
            color: 3092790,
            description: `Info on **${msg.guild.name}**`,
            fields: [{
                name: '❯ Channels',
                value: stripIndents `
              • ${msg.guild.channels.cache.filter(ch => ch.type === 'text').size} **Text**, ${msg.guild.channels.cache.filter(ch => ch.type === 'voice').size} **Voice**`,
                inline: true
              },
                {
                    name: '❯ Member',
                    value: stripIndents `
                  • ${msg.guild.memberCount} members
                  • **Owner** <@${msg.guild.ownerID}>
                  `,
                    inline: true
                  },
                {
                    name: '❯ Other',
                    value: stripIndents `
      • **Roles** ${msg.guild.roles.cache.size}
      • **Region** ${msg.guild.region}
      • **Created at** ${moment.utc(msg.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`
                }
            ],
            thumbnail: {
                url: msg.guild.iconURL({dynamic: true})
            },
            footer: {
                text: "© Spartan"
            },
            timestamp: new Date()
        });
    }
};