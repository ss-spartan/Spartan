const { DiscordAPIError } = require("discord.js");
const Commando = require("discord.js-commando")
const { stripIndents } = require('common-tags');
const chalk = require('chalk')

module.exports= class MemberCountCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'membercount',
            aliases: ['mbc', 'member'],
            group: 'info',
            description: 'See how many members are in the server.',
            memberName: 'membercount',
            argsType: 'multiple',
            userPermissions: ['SEND_MESSAGES'],
            clientPermissions: ["EMBED_LINKS"],
        });
    };
run ( msg, message) {

    const { memberCount } = msg.guild;
    return msg.embed({
    color: 3092790,
            title: `**${msg.guild.name}**`,
            fields: [{
                name: '❯ Members',
                value: stripIndents `
              • ${memberCount}`,
                inline: true
              },
            ],
            thumbnail: {
                url: msg.guild.iconURL({dynamic: true})
            },
            footer: {
                text: "© Spartan"
            },
            timestamp: new Date()
            })}}