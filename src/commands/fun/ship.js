const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const cfg = require("../../../cfg.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription(
      "calculates the love compatibility and a ship name of two people"
    )
    .addUserOption((option) =>
      option
        .setName("user1")
        .setDescription("select a person to ship with!")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user2")
        .setDescription("select another person to ship with!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user1 = interaction.options.getUser("user1")?.username;
    const user2 = interaction.options.getUser("user2")?.username;
    const user1slice = user1.slice(0, user1.length / 2);
    const user2slice = user2.slice(user2.length / 2);
    const percent = Math.floor(Math.random() * 100) + 1;

    const baseEmbed = new MessageEmbed()
      .setTitle(`this isn't going to work out... 😬`)
      .setColor(cfg.embed.colours.default)
      .setDescription(`**${percent}%** | nothing much to say here...`);

    const thirtyEmbed = new MessageEmbed()
      .setTitle(`cute couple 😅`)
      .setColor(cfg.embed.colours.default)
      .setDescription(`**${percent}%** | not much to say here...`);

    const fiftyEmbed = new MessageEmbed()
      .setTitle(`adorable couple!! 😊`)
      .setColor(cfg.embed.colours.default)
      .setDescription(
        `**${percent}%** | i call this ship "${user1slice + user2slice}"`
      );

    const eightyEmbed = new MessageEmbed()
      .setTitle(`AHH CUTE!!~ 😍`)
      .setColor(cfg.embed.colours.default)
      .setDescription(
        `**${percent}%** | i call this ship "${user1slice + user2slice}"`
      );

    const topEmbed = new MessageEmbed()
      .setTitle(`${user1} + ${user2} = ${user1slice + user2slice}`)
      .setColor(cfg.embed.colours.default)
      .setDescription(`**${percent}%** | a match made in heaven. 💖`);

    switch (percent) {
      case percent < 30:
        interaction.reply({ embeds: [baseEmbed] });
        break;
      case percent < 50:
        interaction.reply({ embeds: [thirtyEmbed] });
        break;
      case percent < 80:
        interaction.reply({ embeds: [fiftyEmbed] });
        break;
      case percent < 95:
        interaction.reply({ embeds: [eightyEmbed] });
        break;
      case percent < 98:
        interaction.reply({ embeds: [topEmbed] });
        break;
      default:
        interaction.reply({ embeds: [fiftyEmbed] });
        break;
    }
  },
};
