const { Command } = require('discord.js-commando');
const chalk = require('chalk')
const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;
const LinkRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: ['prune', 'bulkdelete', 'flush'],
            group: 'moderation',
            memberName: 'purge',
            description: 'Deletes up to 99 messages from the current channel.',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            examples: ['purge [1-100] <all/images/links/bots/codeblocks/attachments/embeds/me>'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                    key: 'count',
                    label: 'messages to be purged',
                    prompt: 'Please provide me a set number of messages to purge!',
                    type: 'integer',
                    validate: count => {
                        if (count < 100 && count > 0) return true;
                        return 'I can\'t delete more than 99 messages at once!';
                    }
                },
                {
                    key: 'type',
                    label: 'type of messages purged',
                    prompt: 'Please provide me a valid type of message to purge!',
                    type: 'string',
                    default: "all",
                    validate: base => {
                        if (['all', 'images', 'pics', 'image', 'bots', 'bot', 'codeblocks', 'code', 'attachments', 'attachment', 'files', 'file', 'embeds', 'embed', 'me', 'links', 'link'].includes(base.toLowerCase())) return true;
                        return 'Please enter a valid type of message! `all` `images` `links` `attachments` `bots` `codeblocks` `embeds` `me`';
                    },
                }
            ]
        });
    }

    async run(message, args) {
        console.log(chalk.cyan.bold(`Purge was ran by:`, chalk.red.bold`${message.author.tag}`, chalk.yellow.bold('in'), chalk.red.bold`${message.guild.name}`))
        const { count, type } = args;

        if (type == 'all') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'message!' : 'messages!'}`).then(msg=> {msg.delete({timeout: 10000})})

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'images' || type == 'pics' || type == 'image') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })

                const attachments = messages.filter(m => ImageRegex.test(m.content))
                const urls = messages.filter(m => m.attachments.size > 0)

                const flushable = attachments.concat(urls)

                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no images to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                await message.channel.bulkDelete(flushable)

                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'image!' : 'images!'}`).then(msg=> {msg.delete({timeout: 10000})})

                return null;
            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 10000})})

            }

        }

        if (type == 'bots' || type == 'bot') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.author.bot)
                await message.channel.bulkDelete(flushable)
                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no bot messages to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'bot message!' : 'bot messages!'}`).then(msg=> {msg.delete({timeout: 10000})})

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 500})})

            }
        }

        if (type == 'codeblocks' || type == 'code') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.content.startsWith('```'));

                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no codeblocks to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'codeblock!' : 'codeblocks!'}`).then(msg=> {msg.delete({timeout: 10000})})

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 500})})

            }
        }

        if (type == 'attachments' || type == 'attachment' || type == 'files' || type == 'file') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.attachments.length > 0)
                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no attachments to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'attachment!' : 'attachments!'}`).then(msg=> {msg.delete({timeout: 10000})})

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 500})})

            }
        }

        if (type == 'embeds' || type == 'embed') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.embeds.length > 0)
                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no embeds to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'embed!' : 'embeds!'}`).then(msg=> {msg.delete({timeout: 10000})})

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 500})})

            }
        }

        if (type == 'me') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.id == message.author.id)
                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no messages from you to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** of your messages!`).then(msg=> {msg.delete({timeout: 10000})})

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 500})})

            }
        }

        if (type == 'link' || type == 'links') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => LinkRegex.test(m.content))
                if (flushable.size == 0) return message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, there were no links to prune in the last ${count} messages!`).then(msg=> {msg.delete({timeout: 10000})})

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`<:spartan2:819686842362101760> | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'link!' : 'links!'}`).then(msg=> {msg.delete({timeout: 10000})})

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('<:spartan2:819686842362101760> | These messages are too old to be deleted! I can only delete messages within two weeks!').then(msg=> {msg.delete({timeout: 500})})

            }
        }
    }
};