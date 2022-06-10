// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const cfg = require("../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("pats the mentioned user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("enter a user to pat!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const suffixes = cfg.misc.pat.suffixes;
    const verbs = cfg.misc.pat.verbs;
    const { url } = await fetch(cfg.api.pat).then((res) => res.json());

    // create embed
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
      .setFooter({ text: `fetched from ${cfg.api.pat}.` });

    // if its the same person that ran, the bot pats instead
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
