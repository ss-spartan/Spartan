const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Discord = require("discord.js");
const chalk = require('chalk')
const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");
  const Commando = require('discord.js-commando')

  module.exports = class BackUpCreateCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'backup-create',
                group: 'moderation',
                memberName: 'backup-create',
                description: 'Creates a backup for the server. `Note that this command will use a webhook to send the deleted messages whenever you decide to load it.`',
                argsType: 'multiple',
                guildOnly: true,
                clientPermissions: ["MANAGE_GUILD"],
            userPermissions: ['ADMINISTRATOR'],
            throttling: {
              usages: 3,
              duration: 10
          },
            });
        };
        async run(message) {

            backup
              .create(message.guild, {
                jsonBeautify: true
              })
              .then(backupData => {
                // And send informations to the backup owner
                message.author.send(
                  new Discord.MessageEmbed()
                 .setAuthor(`Spartan successfully created a backup.`)
                  .setColor("#2f3136")
                  .setDescription(`To load backup, use ,backup-load **${backupData.id}**`)
                  .setThumbnail(message.author.displayAvatarURL())
                  )
                message.channel.send(//backupData.id
                  new Discord.MessageEmbed()
                  .setAuthor(`Spartan successfully created a backup.`)
                  .setColor("#2f3136")
                  .setThumbnail(message.author.displayAvatarURL())
                  .setDescription("The backup ID has been sent to your DM's, make sure you don't have them disabled!")
                );
              });
            }
          };
