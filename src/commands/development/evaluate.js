// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const print = require("../../misc/helpers/print.js");
const cfg = require("../../../cfg.json");
const { inspect } = require("util");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evaluate")
    .setDescription("evaluates the given string of code")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("enter the code to evaluate!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const code = interaction.options.getString("code");

    if (
      interaction.user.id === cfg.info.owner.id[0] ||
      interaction.user.id === cfg.info.owner.id[1]
    ) {
      // actual eval code
      print.warn(
        `'${interaction.user.tag}' ran evaluate at <#${interaction.channel.id}> and ran:\n            ${code}`
      );

      let res;
      try {
        res = eval(code);
        res = inspect(res, { depth: 0 });
      } catch (error) {
        res = inspect(error, { depth: 0 });
      }

      const embed = new MessageEmbed()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setColor(cfg.embed.colour)
        .setTitle("evaluation")
        .addField("code snippet", `\`\`\`js\n${code.slice(0, 1015)}\`\`\``)
        .addField("node.js results", `\`\`\`js\n${res.slice(0, 1015)}\`\`\``)
        .setFooter({
          text: `running node.js ${process.version}`,
        })
        .setTimestamp();

      interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      interaction.reply({
        content: "you do not have permission to use that command!",
        ephemeral: true,
      });
      print.error(
        "A user attempted to run evaluate! Make sure to remove evaluate before getting ready for production!"
      );
    }
  },
};
