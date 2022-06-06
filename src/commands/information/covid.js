// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const cfg = require("../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("covid")
    .setDescription("get the current covid statistics")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("worldwide")
        .setDescription("shows COVID-19 statistics worldwide")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("continent")
        .setDescription("shows COVID-19 statistics from a continent")
        .addStringOption((option) =>
          option
            .setName("area")
            .setDescription("enter a continent to fetch information from!")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("country")
        .setDescription("shows COVID-19 statistics from a country")
        .addStringOption((option) =>
          option
            .setName("area")
            .setDescription("enter a country to fetch information from!")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("help stop coronavirus!")
        .setURL(cfg.misc.covid.prevention)
    );

    if (interaction.options.getSubcommand() === "worldwide") {
      const api = await fetch(cfg.api.covid.all).then((r) => r.json());

      const embed = new MessageEmbed()
        .setColor(cfg.embed.colours.default)
        .setAuthor({
          name: "worldwide COVID-19 statistics",
          iconURL: cfg.misc.covid.icon,
        })
        .addFields(
          {
            name: "cases",
            value: api.cases.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "cases per 1 mil",
            value: api.casesPerOneMillion.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "cases today",
            value: api.todayCases.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "active",
            value: api.active.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "critical",
            value: api.critical.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "countries",
            value: api.affectedCountries + " / 251",
            inline: true,
          },
          {
            name: "recovered",
            value: api.recovered.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "deaths",
            value: api.deaths.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "deaths today",
            value: api.todayDeaths.toLocaleString("en-GB"),
            inline: true,
          }
        );

      interaction.reply({ embeds: [embed], components: [button] });
    } else if (interaction.options.getSubcommand() === "continent") {
      const area = interaction.options.getString("area");
      const api = await fetch(
        cfg.api.covid.continent.replace("{{continent}}", area)
      ).then((r) => r.json());

      if (api.message === "Continent not found or doesn't have any cases") {
        interaction.reply(
          "the continent you specified does not exist or does not have any cases."
        );
        return;
      }

      const embed = new MessageEmbed()
        .setColor(cfg.embed.colours.default)
        .setAuthor({
          name: `${api.continent} COVID-19 statistics`,
          iconURL: cfg.misc.covid.icon,
        })
        .addFields(
          {
            name: "cases",
            value: api.cases.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "cases per 1 mil",
            value: api.casesPerOneMillion.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "cases today",
            value: api.todayCases.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "active",
            value: api.active.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "critical",
            value: api.critical.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "countries",
            value: api.countries.length.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "recovered",
            value: api.recovered.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "deaths",
            value: api.deaths.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "deaths today",
            value: api.todayDeaths.toLocaleString("en-GB"),
            inline: true,
          }
        );

      interaction.reply({ embeds: [embed], components: [button] });
    } else if (interaction.options.getSubcommand() === "country") {
      const area = interaction.options.getString("area");
      const api = await fetch(
        cfg.api.covid.country.replace("{{country}}", area)
      ).then((r) => r.json());

      if (api.message === "Country not found or doesn't have any cases") {
        interaction.reply(
          "the country you specified does not exist or does not have any cases."
        );
        return;
      }

      const embed = new MessageEmbed()
        .setColor(cfg.embed.colours.default)
        .setAuthor({
          name: `${api.country} COVID-19 statistics`,
          iconURL: cfg.misc.covid.icon,
        })
        .addFields(
          {
            name: "cases",
            value: api.cases.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "cases per 1 mil",
            value: api.casesPerOneMillion.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "cases today",
            value: api.todayCases.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "active",
            value: api.active.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "critical",
            value: api.critical.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "recovered",
            value: api.recovered.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "deaths",
            value: api.deaths.toLocaleString("en-GB"),
            inline: true,
          },
          {
            name: "deaths today",
            value: api.todayDeaths.toLocaleString("en-GB"),
            inline: true,
          }
        );

      interaction.reply({ embeds: [embed], components: [button] });
    }
  },
};
