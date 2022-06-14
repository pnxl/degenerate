const { SlashCommandBuilder } = require("@discordjs/builders");
const cfg = require(".././../../cfg.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("impersonate")
    .setDescription(
      "impersonates someone -- only accessible for specific users"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("select a person to impersonate!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("enter a message you want to send!")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (cfg.misc.impersonate.whitelist.includes(interaction.user.id) === false)
      return interaction.reply({
        content: "you are not allowed to use this command!",
        ephemeral: true,
      });

    const usr = interaction.options.getUser("user");
    const str = interaction.options.getString("message");

    const av = await usr?.displayAvatarURL({
      dynamic: true,
    });

    const webhook = await interaction.channel.createWebhook(usr?.username, {
      avatarURL: av,
    });

    webhook.send({
      content: str,
      username: usr?.username,
      avatarURL: av,
    });

    await interaction.reply({
      content: "webhook sent!",
      ephemeral: true,
    });

    await webhook.delete();
  },
};
