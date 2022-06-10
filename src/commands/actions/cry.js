// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const cfg = require("../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cry")
    .setDescription("makes you cry"),
  async execute(interaction) {
    const suffixes = cfg.misc.cry.suffixes;
    const verbs = cfg.misc.cry.verbs;
    const { url } = await fetch(cfg.api.cry).then((res) => res.json());

    const embed = new MessageEmbed()
      .setColor(cfg.embed.colours.default)
      .setAuthor({
        name: `${interaction.member.displayName} ${
          verbs[Math.floor(Math.random() * verbs.length)]
        }~ ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
        iconURL: interaction.user.avatarURL(),
      })
      .setImage(url)
      .setFooter({ text: `fetched from ${cfg.api.cry}.` });

    await interaction.reply({ embeds: [embed] });
  },
};
