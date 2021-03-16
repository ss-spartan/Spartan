// This event runs whenever the bot starts up
// It's basically for creating its presence on Discord

const activities = require("../bot/activities");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {

    await this.client.wait(1000);

    this.client.appInfo = await this.client.fetchApplication();
    setInterval( async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);


    this.client.user.setStatus("dnd"); // Goes on dnd shortly for letting everyone know it boots up
    await this.client.wait(5000); // = 5 seconds in miliseconds

    this.client.user.setStatus("online"); // Then, after 5 seconds, sets the status back to online

    // Activity List
    // You can add more to it in activities.json!
    setInterval(() => { // Randomly choses one of the following activites in an Interval 
      let index = activities[Math.round(Math.random() * (activities.length - 1))];
      this.client.user.setPresence({ game: { name: index, type: "PLAYING"}});
  }, 300000); // Changes every 5 minutes
    this.client.logger.log(`Ready and logged in as ${this.client.user.tag}`, "ready");
  }
};
