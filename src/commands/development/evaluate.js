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
    if (
      interaction.author.id === cfg.info.owner.id[0] ||
      interaction.author.id === cfg.info.owner.id[1]
    ) {
      // actual eval code
      print.warn(
        `'${interaction.author.tag}' ran evaluate at <#${
          interaction.channel.id
        }> and ran:\n            ${args.join(" ")}`
      );

      const snippet = args.join(" ");

      let res;
      try {
        res = eval(snippet);
        res = inspect(res, { depth: 0 });
      } catch (error) {
        res = inspect(error, { depth: 0 });
      }

      const embed = new MessageEmbed()
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL(),
        })
        .setColor(cfg.embed.colour)
        .setTitle("evaluation")
        .addField("code snippet", `\`\`\`js\n${snippet.slice(0, 1015)}\`\`\``)
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
