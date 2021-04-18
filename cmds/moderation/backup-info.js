const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const chalk = require('chalk')
const Discord = require("discord.js");
const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");
  const Commando = require('discord.js-commando')

  module.exports = class BackUpInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'backup-info',
                group: 'moderation',
                memberName: 'backup-info',
                description: 'Gives you information on a made backup. `Note that this command will use a webhook to backup and then send the deleted messages.`',
                argsType: 'multiple',
                ownerOnly: true,
                guildOnly: true,
                clientPermissions: ["ADMINISTRATOR"],
            userPermissions: ['ADMINISTRATOR'],
            throttling: {
                usages: 3,
                duration: 10
            },
            });
        };
        async run(message, args) {
          let backupID = args[0];
          if(!backupID){
              return message.channel.send(":x: | You must specify a valid backup ID!");
          }
          // Fetch the backup
          backup.fetch(backupID).then((backupInfos) => {
              const date = new Date(backupInfos.data.createdTimestamp);
              const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
              const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
              let embed = new Discord.MessageEmbed()
                  .setAuthor("Backup Informations")
                  // Display the backup ID
                  .addField("Backup ID", backupInfos.id, false)
                  // Displays the server from which this backup comes
                  .addField("Server ID", backupInfos.data.guildID, false)
                  // Display the size (in mb) of the backup
                  .addField("Size", `${backupInfos.size} mb`, false)
                  // Display when the backup was created
                  .addField("Created at", formatedDate, false)
                  .setColor('#2f3136');
              message.channel.send(embed);
          }).catch((err) => {
              // if the backup wasn't found
              return message.channel.send(":x: | No backup found for `"+backupID+"`!");
          });
      }
    };