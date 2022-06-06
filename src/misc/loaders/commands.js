// import modules
const { readdirSync } = require("fs");

module.exports = async (client, print) => {
  // search 4 commands
  const folders = readdirSync("./src/commands");

  for (const folder of folders) {
    const files = readdirSync(`./src/commands/${folder}`).filter((f) =>
      f.endsWith(".js")
    );

    for (const file of files) {
      const command = require(`../../commands/${folder}/${file}`);
      client.applicationCmd.set(command.data.name, command);
      print.log(`Loaded command: ${command.data.name}`);
    }
  }

  // print that its done yes ok
  print.success("All commands have been loaded!");
};
