# This is a discontinued project.

Hello, coder! This is what remains of the Spartan bot, I know you're probably thinking.. "What happened here"? Well, I took a break from discord development, and the Commando discord.js version deprecated therefore I couldn't continue using it without rebuilding my own one. BUT! I did learn a lot of things while coding this bot, feel free to check the code out and even take anything you need!


# Files

Anything that Spartan saved, was saved to a mongoDB cluster, which is now deleted due to the low usage.


# Installation

If you want to see if it's still functional, or to experiment with it. Fork it! This used to run on heroku from time to time, hence the `Procfile`, but It works locally as well! Just follow the steps below. 

Since Commando is deprecated, you'll have to use my version.
   
   1. In the first step we need to clone the project
	   >git clone https://github.com/ss-spartan/Spartan
   2. Go to the cloned project and run
       > npm install
		NOTE: If commando doesn't install, use this git+https://github.com/ss-spartan/SpartanCommando.git
   3. Write all the secrets in the config.json file
       >{
    "token": "YOUR DISCORD TOKEN",
    "prefix": "THE PREFIX FOR YOUR COMMANDS",
    "mongoPath": "  ",
    "ownerId": " YOUR OWNER ID ",
    "youtubeAPI": "     ",
    "GOOGLE_CUSTOM_SEARCH": " doesn't function ",
    "GOOGLE_CUSTOM_SEARCH_CX": " doesn't function ",
    "reportchannel": "A CHANNEL IN DISCORD FOR REPORTS",
    "twitchClientID": " doesn't work ",
    "twitchClientSecret": " doesn't work"
    }

  4. Run index.js with
      > **node index.js**
      > OR
      >**npm run dev** (must have nodemon installed)



## Feel free to open any issues or fix anything!
