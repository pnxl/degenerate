// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const cfg = require("../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddles")
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
    const { url } = await fetch(
      cfg.api.cuddle[Math.floor(Math.random() * cfg.api.cuddle.length)]
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setColor(cfg.embed.colours.default)
      .setAuthor({
        name: `${interaction.member.displayName} ${
          verbs[Math.floor(Math.random() * verbs.length)]
        }~ ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
        iconURL: interaction.user.avatarURL(),
      })
      .setImage(url)
      .setFooter({ text: `fetched from ${cfg.api.cuddle}.` });

    await interaction.reply({ embeds: [embed] });
  },
};
