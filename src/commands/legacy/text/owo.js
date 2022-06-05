const transform = require("../../../misc/helpers/transform.js");

module.exports = {
  name: "owo",
  description: "owo-ifies the given string",
  args: true,
  usage: "[message]",

  async execute(message, args) {
    const str = args.join(" ");

    const transformed = transform.owo(str);

    const av = await message.author.displayAvatarURL({
      dynamic: true,
    });

    const webhook = await message.channel.createWebhook(
      message.member.displayName,
      {
        avatar: av,
      }
    );

    webhook.send({
      content: transformed,
      username: message.member.displayName,
      avatarURL: av,
    });

    await message.delete();

    await webhook.delete();
  },
};
