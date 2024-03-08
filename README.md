# Spartan - Discord Bot

[Developer Support Server](https://discord.gg/6ssXSzgf) || [Spartan Invite](https://discord.com/oauth2/authorize?client_id=781599195986526208&permissions=1239567297142&scope=applications.commands+bot)

Hello, coder! I am currently working on this project. I have made a [specific branch](https://github.com/ss-spartan/Spartan/tree/oldVersion) to view the old version of this discord bot.


## Description

Spartan is a versatile Discord bot designed to elevate your music experience. It seamlessly integrates with the Last.fm API, allowing you to connect your Last.fm account and enjoy features like:

`/nowplaying`: Get the currently playing song from your Last.fm profile.
`/setfm <username>`: Link your Last.fm username to the bot for personalized music commands.
`/recent`: View your recently played tracks on Last.fm.

(Please note, as of now, Spartan only supports slash(application) commands.)

## Features

Last.fm Integration: Connect your Last.fm account and leverage its features within your Discord server.

..... (more to come soon)


## Installation

### Prerequisites:

**Node.js**(v.18 or later) and **bun** installed on your system.
You can download them from:
**Node.js**: https://nodejs.org/en
**bun**: https://bun.sh/

**Last.fm API and Secret Key**
You can get them at [LastFM - Api](https://www.last.fm/api)
Follow the instructions and you'll get them with no hassle.

**MongoDB**
You will need a database to save the users for the LastFm integration.
You can create a **'development'** cluster for free.

[MongoDB - Setup](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)

After you've made a user, you will need to follow this:

[MongoDB - Connect](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)

After those initial steps, you're ready to setup the bot! Follow the steps below.

## Steps:

1. Create a Discord Application from [Discord Developer Portal](https://discord.com/developers/docs/intro)
2. In the "**Bot**" section, create a bot and copy its token (keep it confidential).
3. While you're at the portal, make sure to invite your bot to the server you want.
4. Go to **OAuth2**, select the **bot** and **application.commands** scopes.
5. Scroll lower and you will see **OAuth2 URL Generator**, in here select **applications.commands** and **bot**, if you scroll lower you will be asked what permissions to give your bot. Choose Administrator.
6. Clone this Repository.
7. Open cloned folder in your favorite IDE, rename .env.example > .env

```
TOKEN= Replace with the bot token you copied earlier
LASTFM_API= Replace with the API key you made earlier
LASTFM_SECRET= Replace with the Secret key you made earlier
MONGODB_PATH= Replace with the mongo path (connect).
```

After you've made those changes, the next step left to do is install the packages!

Open a terminal, and type the following:

**``bun install``**, this will install all the necessary packages.

Once all the packages are installed, you can start the bot by doing

**``bun start``** and you're good to go! Enjoy!