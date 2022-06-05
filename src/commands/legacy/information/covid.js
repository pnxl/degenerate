// import modules
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const cfg = require("../../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  name: "covid",
  description: "get the current covid statistics",
  args: true,
  usage: "<worldwide|continent|country> [area]",
  async execute(message, args) {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("help stop coronavirus!")
        .setURL(cfg.misc.covid.prevention)
    );

    if (args[0] === "worldwide") {
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

      message.reply({ embeds: [embed], components: [button] });
    } else if (args[0] === "continent") {
      if (!args[1]) return message.reply("please specify a continent!");
      const api = await fetch(
        cfg.api.covid.continent.replace("{{continent}}", args[1])
      ).then((r) => r.json());

      if (api.message === "Continent not found or doesn't have any cases") {
        message.reply(
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

      message.reply({ embeds: [embed], components: [button] });
    } else if (args[0] === "country") {
      if (!args[1]) return message.reply("please specify a country!");
      const api = await fetch(
        cfg.api.covid.country.replace("{{country}}", args[1])
      ).then((r) => r.json());

      if (api.message === "Country not found or doesn't have any cases") {
        message.reply(
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

      message.reply({ embeds: [embed], components: [button] });
    }
  },
};
