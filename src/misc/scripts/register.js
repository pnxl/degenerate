// init console
console.clear;
const print = require("../helpers/print.js");

// import modules
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();

// def cmd array
const cmds = [];

// search 4 commands
const folders = readdirSync("./src/commands");

for (const folder of folders) {
  const files = readdirSync(`./src/commands/${folder}`).filter((f) =>
    f.endsWith(".js")
  );

  for (const file of files) {
    const cmd = require(`../../commands/${folder}/${file}`);
    cmds.push(cmd.data.toJSON());
    print.debug(`Pushed command: ${cmd.data.name}.js`);
  }
}

// login as bot
const rest = new REST({ version: "9" }).setToken(process.env.secret);

// push 2 d-api
(async () => {
  try {
    print.log("Attempting to register commands...");

    await rest.put(
      Routes.applicationGuildCommands(process.env.client, process.env.server),
      {
        body: cmds,
      }
    );

    print.ready("Successfully registered commands!");
  } catch (error) {
    print.error(error);
  }
})();
