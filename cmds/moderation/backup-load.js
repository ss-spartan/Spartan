const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Discord = require("discord.js");
const chalk = require('chalk')
const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");
  const Commando = require('discord.js-commando')

  module.exports = class BackUpLoadCommand extends Commando.Command {
    constructor(client) {
        super(client, {
                name: 'backup-load',
                group: 'moderation',
                memberName: 'backupload',
                description: 'Loads a created backup. `Note that this command will use a webhook to send the deleted messages, and the Backup Code will be deleted after the load has been completed.`',
                argsType: 'multiple',
                guildOnly: true,
                clientPermissions: ["ADMINISTRATOR"],
            userPermissions: ['ADMINISTRATOR'],
            });
        };
        async run(message, args) {
            let backupID = args[0];
            if(!backupID){
                return message.channel.send(":x: | You must specify a valid backup ID!");
            }
            // Fetching the backup to know if it exists
            backup.fetch(backupID).then(async () => {
                // If the backup exists, request for confirmation
                message.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced and the `backup` will be deleted afterwards! React down below to confirm!").then(m => {
                    m.react("✅")
                const filtro = (reaction, user) => {
                return ["✅"].includes(reaction.emoji.name) && user.id == message.author.id;
                };
                    m.awaitReactions(filtro, {
                        max: 1,
                        time: 20000,
                        errors: ["time"]
                    }).catch(() => {
                        // if the author of the commands does not confirm the backup loading
                        m.edit(":x: | Time's up! Cancelled backup loading!");
                    }).then(coleccionado=> {
                        
                    const reaccion = coleccionado.first();
                    if(reaccion.emoji.name === "✅"){
                      // When the author of the command has confirmed that he wants to load the backup on his server
                      message.author.send("I've started loading the backup! <:Spartan:824723825597480978>");
                      // Load the backup
                      backup.load(backupID, message.guild).then(() => {
                        // When the backup is loaded, delete them from the server
                          backup.remove(backupID);
                      }).catch((err) => {
                          // If an error occurred
                          return message.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
                      });
            };
            
                    })
                })
        });
    }};
