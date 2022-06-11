// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const cfg = require("../../../cfg.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("returns a list of commands"),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor(cfg.embed.colours.default)
      .setAuthor({
        name: "showing all commands for this bot",
      })
      .setFooter({ text: "running bot version 1.0.0" });

    let numOfCmd = 0;

    // search 4 commands
    const folders = readdirSync("./src/commands");

    for (const folder of folders) {
      const files = readdirSync(`./src/commands/${folder}`).filter((f) =>
        f.endsWith(".js")
      );

      for (const file of files) {
        const command = require(`../../commands/${folder}/${file}`);
        numOfCmd += 1;
        embed.addField("/" + command.data.name, command.data.description);
        embed.setFooter({
          text: "running bot version 1.0.0 • " + numOfCmd + " commands loaded!",
        });
      }
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
