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

    function percentageBias() {
      if (
        /*
         * 648896419020668928 is bri
         * 466453424930553856 is evan
         */
        (interaction.options.getUser("user1")?.id === "648896419020668928" &&
          interaction.options.getUser("user2")?.id === "466453424930553856") ||
        (interaction.options.getUser("user2")?.id === "648896419020668928" &&
          interaction.options.getUser("user1")?.id === "466453424930553856")
      ) {
        return 100;
      } else if (
        /*
         * 967724967741513808 is jason
         * 763970485373370370 is kei
         */
        (interaction.options.getUser("user1")?.id === "967724967741513808" &&
          interaction.options.getUser("user2")?.id === "763970485373370370") ||
        (interaction.options.getUser("user2")?.id === "967724967741513808" &&
          interaction.options.getUser("user1")?.id === "763970485373370370")
      ) {
        return 100;
      } else if (
        /*
         * 728180364962562108 is cha
         * 775550130115444776 is ashley
         */
        (interaction.options.getUser("user1")?.id === "728180364962562108" &&
          interaction.options.getUser("user2")?.id === "775550130115444776") ||
        (interaction.options.getUser("user2")?.id === "728180364962562108" &&
          interaction.options.getUser("user1")?.id === "775550130115444776")
      ) {
        return 100;
      } else if (
        /*
         * 683126724304830570 is tristan
         * 466453424930553856 is evan
         */
        (interaction.options.getUser("user1")?.id === "683126724304830570" &&
          interaction.options.getUser("user2")?.id === "466453424930553856") ||
        (interaction.options.getUser("user2")?.id === "683126724304830570" &&
          interaction.options.getUser("user1")?.id === "466453424930553856")
      ) {
        return 100;
      } else if (
        /*
         * 648896419020668928 is bri
         * 871926990112956457 is karyn
         */
        (interaction.options.getUser("user1")?.id === "648896419020668928" &&
          interaction.options.getUser("user2")?.id === "871926990112956457") ||
        (interaction.options.getUser("user2")?.id === "648896419020668928" &&
          interaction.options.getUser("user1")?.id === "871926990112956457")
      ) {
        return 100;
      } else if (
        /*
         * 648896419020668928 is bri
         * 817257502436491294 is karyn
         */
        (interaction.options.getUser("user1")?.id === "648896419020668928" &&
          interaction.options.getUser("user2")?.id === "817257502436491294") ||
        (interaction.options.getUser("user2")?.id === "648896419020668928" &&
          interaction.options.getUser("user1")?.id === "817257502436491294")
      ) {
        return 100;
      } else {
        return percent;
      }
    }

    function shipName() {
      if (
        /*
         * 967724967741513808 is jason
         * 763970485373370370 is kei
         */

        (interaction.options.getUser("user1")?.id === "967724967741513808" &&
          interaction.options.getUser("user2")?.id === "763970485373370370") ||
        (interaction.options.getUser("user2")?.id === "967724967741513808" &&
          interaction.options.getUser("user1")?.id === "763970485373370370")
      ) {
        return "keison";
      } else if (
        /*
         * 728180364962562108 is cha
         * 775550130115444776 is ashley
         */
        (interaction.options.getUser("user1")?.id === "728180364962562108" &&
          interaction.options.getUser("user2")?.id === "775550130115444776") ||
        (interaction.options.getUser("user2")?.id === "728180364962562108" &&
          interaction.options.getUser("user1")?.id === "775550130115444776")
      ) {
        return "chash ☆";
      }  else if (
        /*
         * 648896419020668928 is bri
         * 466453424930553856 is evan
         */
        (interaction.options.getUser("user1")?.id === "648896419020668928" &&
          interaction.options.getUser("user2")?.id === "466453424930553856") ||
        (interaction.options.getUser("user2")?.id === "648896419020668928" &&
          interaction.options.getUser("user1")?.id === "466453424930553856")
      ) {
        /*
         * POSSIBLE SHIP NAMES
         * - brevan
         * - brev
         * - ebitta
         * - evbitta
         * - brivan
         * - egitta
         */

        return "brevan";
      } else if (
        /*
         * 683126724304830570 is tristan
         * 466453424930553856 is evan
         */
        (interaction.options.getUser("user1")?.id === "683126724304830570" &&
          interaction.options.getUser("user2")?.id === "466453424930553856") ||
        (interaction.options.getUser("user2")?.id === "683126724304830570" &&
          interaction.options.getUser("user1")?.id === "466453424930553856")
      ) {
        return "trisvan";
      } else if (
        /*
         * 648896419020668928 is bri
         * 871926990112956457 is karyn
         */
        (interaction.options.getUser("user1")?.id === "648896419020668928" &&
          interaction.options.getUser("user2")?.id === "871926990112956457") ||
        (interaction.options.getUser("user2")?.id === "648896419020668928" &&
          interaction.options.getUser("user1")?.id === "871926990112956457")
      ) {
        return "kargitta"; // car-guitar lol
      } else if (
        /*
         * 648896419020668928 is bri
         * 817257502436491294 is karyn
         */
        (interaction.options.getUser("user1")?.id === "648896419020668928" &&
          interaction.options.getUser("user2")?.id === "817257502436491294") ||
        (interaction.options.getUser("user2")?.id === "648896419020668928" &&
          interaction.options.getUser("user1")?.id === "817257502436491294")
      ) {
        return "kargitta";
      } else {
        return user1slice + user2slice;
      }
    }

    const baseEmbed = new MessageEmbed()
      .setTitle(`this isn't going to work out... 😬`)
      .setColor(cfg.embed.colours.default)
      .setDescription(`**${percentageBias()}%** | nothing much to say here...`);

    const thirtyEmbed = new MessageEmbed()
      .setTitle(`cute couple 😅`)
      .setColor(cfg.embed.colours.default)
      .setDescription(`**${percentageBias()}%** | not much to say here...`);

    const fiftyEmbed = new MessageEmbed()
      .setTitle(`adorable couple!! 😊`)
      .setColor(cfg.embed.colours.default)
      .setDescription(
        `**${percentageBias()}%** | i call this ship "${shipName()}"`
      );

    const eightyEmbed = new MessageEmbed()
      .setTitle(`AHH CUTE!!~ 😍`)
      .setColor(cfg.embed.colours.default)
      .setDescription(
        `**${percentageBias()}%** | i call this ship "${shipName()}"`
      );

    const topEmbed = new MessageEmbed()
      .setTitle(`a match made in heaven. 💖`)
      .setColor(cfg.embed.colours.default)
      .setDescription(
        `**${percentageBias()}%** | i call this ship "${shipName()}"`
      );

    if (percentageBias() < 30) {
      interaction.reply({ embeds: [baseEmbed] });
    } else if (percentageBias() < 50) {
      interaction.reply({ embeds: [thirtyEmbed] });
    } else if (percentageBias() < 80) {
      interaction.reply({ embeds: [fiftyEmbed] });
    } else if (percentageBias() < 95) {
      interaction.reply({ embeds: [eightyEmbed] });
    } else if (percentageBias() > 98) {
      interaction.reply({ embeds: [topEmbed] });
    } else {
      interaction.reply({ embeds: [fiftyEmbed] });
    }
  },
};
