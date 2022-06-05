const { SlashCommandBuilder } = require("@discordjs/builders");
const transform = require("../../../misc/helpers/transform.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("owo")
    .setDescription("owo-ifies the given string")
    .addStringOption((option) =>
      option
        .setName("string")
        .setDescription("enter a message you want to owo-ify")
        .setRequired(true)
    ),
  async execute(interaction) {
    const str = interaction.options.getString("string");

    const transformed = transform.owo(str);

    const av = await interaction.user.displayAvatarURL({
      dynamic: true,
    });

    const webhook = await interaction.channel.createWebhook(
      interaction.member.displayName,
      { avatarURL: av }
    );

    webhook.send({
      content: transformed,
      username: interaction.member.displayName,
      avatarURL: av,
    });

    await interaction.reply({
      content: "Webhook sent!",
      ephemeral: true,
    });

    await webhook.delete();
  },
};
