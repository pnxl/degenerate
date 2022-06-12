// init console
console.clear;
const print = require("./misc/helpers/print.js");

// import modules
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

// import anything else that should be ran
// should comment if running on devel
require("./misc/scripts/host.js")();
require("./misc/scripts/register.js")();

// create client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
module.exports = client;

// create global vars
client.applicationCmd = new Collection();
client.legacyCmd = new Collection();
client.cooldowns = new Collection();

// import loaders
require("./misc/loaders/commands.js")(client, print);
require("./misc/loaders/event.js")(client, print);

// login
client.login(process.env.secret);
