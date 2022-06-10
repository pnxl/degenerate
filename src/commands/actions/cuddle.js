// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const cfg = require("../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddle")
    .setDescription("cuddles with someone else")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("enter a user to cuddle!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const suffixes = cfg.misc.cuddle.suffixes;
    const verbs = cfg.misc.cuddle.verbs;
    const api =
      cfg.api.cuddle[Math.floor(Math.random() * cfg.api.cuddle.length)];
    const { url } = await fetch(api).then((res) => res.json());

    const embed = new MessageEmbed()
      .setColor(cfg.embed.colours.default)
      .setAuthor({
        name: `${interaction.member.displayName} ${
          verbs[Math.floor(Math.random() * verbs.length)]
        } ${interaction.options.getMember("target")?.displayName}!~ ${
          suffixes[Math.floor(Math.random() * suffixes.length)]
        }`,
        iconURL: interaction.user.avatarURL(),
      })
      .setImage(url)
      .setFooter({ text: `fetched from ${api}.` });

    if (interaction.options.getUser("target") === interaction.user) {
      embed.setAuthor({
        name: `${interaction.client.user.username} ${
          verbs[Math.floor(Math.random() * verbs.length)]
        } ${interaction.member.displayName}!~ ${
          suffixes[Math.floor(Math.random() * suffixes.length)]
        }`,
        iconURL: interaction.client.user.avatarURL(),
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
