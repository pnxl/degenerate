// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const cfg = require("../../../cfg.json");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin")
    .setDescription("flips a coin"),
  async execute(interaction) {
    const side = ['heads', 'tails'];
    const chosen = side[Math.floor(Math.random() * side.length)];

    // import mora png -- source: https://static.wikia.nocookie.net/gensin-impact/images/8/84/Item_Mora.png/
    const file = new MessageAttachment('./src/misc/assets/commands/fun/coin/mora.png');

    const embed = new MessageEmbed()
            .setColor(cfg.embed.colours.default)
            .setTitle('coin flip')
            .setThumbnail('attachment://mora.png')
            .setDescription(`it landed on **${chosen}**.`);

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
