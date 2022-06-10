// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const package = require("../../../package.json");
const print = require("../../misc/helpers/print.js");
const os = require("systeminformation");
const { execSync } = require("child_process");
const smbios = require("../../misc/helpers/smbios.js");
const cfg = require("../../../cfg.json");

// fucks haha get it because funcs
function progress(percent) {
  let i = 50;
  const p = percent / 100;
  const f = i - i * p;
  const x = ["`["];
  while (i--) {
    x.push(i < f ? " " : "•");
  }
  return x.join("") + "]`";
}

function timeconv(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("statistics")
    .setDescription("get current statistics on this bot"),
  async execute(interaction) {
    // thonk
    // await interaction.deferReply();

    // don't show commit info if git isn't installed.
    function commit() {
      if (!execSync("git --version").toString().includes("not")) {
        return execSync("git rev-parse --short HEAD").toString().trim();
      } else {
        print.warn(
          "git wasn't found, make sure to add git to the PATH variable to use $update and $statistics."
        );
      }
    }

    const usages = {
      cpu: Math.round((await os.currentLoad()).currentLoad),
      mem: Math.floor(
        100 -
          ((await Math.round((await os.mem()).free / 1073741824)) /
            Math.round((await os.mem()).total / 1073741824)) *
            100
      ),
    };

    // prettier-ignore
    const sysinfo = {
      os: `${(await os.osInfo()).distro} ${(await os.osInfo()).release} (${(await os.osInfo()).arch})`,
      host: (await os.osInfo()).hostname,
      pkg: `Node.js ${process.version}, Discord.js v${package.dependencies['discord.js'].slice(1)}`,
      ver: `v${package.version}, commit \`${commit()}\``,

      manu: `${(await os.system()).manufacturer.replace('Acidanthera', 'Apple')} ${smbios((await os.system()).model)}`,
      cpu: `${(await os.cpu()).manufacturer} ${(await os.cpu()).brand} ${(await os.cpu()).speed} GHz (${(await os.cpu()).physicalCores}c, ${(await os.cpu()).cores}t)`,
      mem: `${(await os.mem()).total / 1073741824} GB @ ${(await os.memLayout())[0].clockSpeed} MHz`,
      uptime: timeconv(os.time().uptime),

      usageCpuPrg: `${progress(usages.cpu)} ${usages.cpu}%`,
      usageCpuInfo: (await os.cpu()).cores,

      usageMemPrg: `${progress(usages.mem)} ${usages.mem}%`,
      usageMemInfo: `${Math.round(
        (await os.mem()).free / 1073741824
      )} GB free out of ${Math.round((await os.mem()).total / 1073741824)} GB total`,
    };

    const general = new MessageEmbed()
      .setTitle(`🌱 general statistics`)
      .setColor(cfg.embed.colours.default)
      .addField("username", interaction.client.user.tag, true)
      .addField("user id", `\`${interaction.client.user.id}\``, true)
      .addField(
        "created at",
        `<t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:f>`
      )
      .addField("owners", cfg.info.owner.ping.join(", "));

    const host = new MessageEmbed()
      .setTitle(`🏠 ${interaction.client.user.username}'s home`)
      .setColor(cfg.embed.colours.default)
      .addField("operating system", sysinfo.os, true)
      .addField("host name", sysinfo.host, true)
      .addField("runtime & library", sysinfo.pkg)
      .addField("version", sysinfo.ver + "\n\u200B")
      .addField("computer model", sysinfo.manu)
      .addField("processor", sysinfo.cpu, true)
      .addField("memory", sysinfo.mem, true)
      .addField("uptime", sysinfo.uptime + "\n\u200B")
      .addField(
        `processor usage (across ${sysinfo.usageCpuInfo} threads)`,
        sysinfo.usageCpuPrg
      )
      .addField(`memory usage (${sysinfo.usageMemInfo})`, sysinfo.usageMemPrg);

    interaction.reply({ embeds: [general, host] })

    // edit the interaction to show the stats
    // prettier-ignore
    //     interaction.editReply(
    // 			`**${interaction.client.user.username}'s home:**\`\`\`
    // Operating System  >> ${(await os.osInfo()).distro} ${(await os.osInfo()).release} (${(await os.osInfo()).arch})
    // Host Name         >> ${(await os.osInfo()).hostname}
    // Runtime & Library >> Node.js ${process.version}, Discord.js ${package.dependencies['discord.js'].slice(1, 10)}
    // Running Version   >> ${version}

    // Computer Model    >> ${(await os.system()).manufacturer} ${(await smbios((await os.system()).model))}
    // Processor         >> ${(await os.cpu()).manufacturer} ${(await os.cpu()).brand} @ ${(await os.cpu()).speed} GHz (${(await os.cpu()).physicalCores}c, ${(await os.cpu()).cores}t)
    // Memory            >> ${Math.round((await os.mem()).total / 1073741824)} GB @ ${(await os.memLayout())[0].clockSpeed} MHz

    // Processor Usage (across ${(await os.cpu()).cores} threads):
    // ${progress(Math.round((await os.currentLoad()).currentLoad))} ${Math.round((await os.currentLoad()).currentLoad)}%

    // Memory Usage (${Math.round((await os.mem()).free / 1073741824)}GB free out of ${Math.round((await os.mem()).total / 1073741824)}GB total):
    // ${progress(Math.round(percentage))} ${Math.round(percentage)}%

    // ${timeconv(os.time().uptime)} and counting... ☆.。.:*・°☆\`\`\``
    // 		);
  },
};
