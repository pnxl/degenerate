// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const package = require("../../../package.json");
const print = require("../../misc/helpers/print.js");
const os = require("systeminformation");
const { execSync } = require("child_process");
const smbios = require("../../misc/helpers/smbios.js");
const cfg = require("../../../cfg.json");
const hostinfo = require("../../misc/assets/misc/helpers/host.json");

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

    // define usages, to be used in other variables
    // this should reduce loading times
    const usages = {
      cpu: Math.round((await os.currentLoad()).currentLoad),
      mem: Math.floor(
        100 -
          (Math.round((await os.mem()).free / 1073741824) /
            Math.round(hostinfo.mem.info.total / 1073741824)) *
            100
      ),
    };

    // define in json so embed could be cleaner
    // prettier-ignore
    const sysinfo = {
      os: `${hostinfo.os.sys.distro} ${hostinfo.os.sys.release} (${hostinfo.os.sys.arch})`,
      host: hostinfo.os.sys.hostname,
      pkg: `Node.js ${process.version}, Discord.js v${package.dependencies['discord.js'].slice(1)}`,
      ver: `v${package.version}, commit \`${commit()}\``,

      manu: `${hostinfo.sys.manufacturer.replace('Acidanthera', 'Apple')} ${smbios(hostinfo.sys.model)}`,
      cpu: `${hostinfo.cpu.manufacturer} ${hostinfo.cpu.brand} ${hostinfo.cpu.speed} GHz (${hostinfo.cpu.physicalCores}c, ${hostinfo.cpu.cores}t)`,
      mem: `${hostinfo.mem.info.total / 1073741824} GB @ ${hostinfo.mem.layout[0].clockSpeed} MHz`,
      uptime: timeconv(os.time().uptime),

      usageCpuPrg: `${progress(usages.cpu)} ${usages.cpu}%`,
      usageCpuInfo: hostinfo.cpu.cores,

      usageMemPrg: `${progress(usages.mem)} ${usages.mem}%`,
      usageMemInfo: `${Math.round(
        (await os.mem()).free / 1073741824
      )} GB free out of ${Math.round(hostinfo.mem.info.total / 1073741824)} GB total`,
    };

    // general embed
    const general = new MessageEmbed()
      .setTitle(`🌱 general statistics`)
      .setColor(cfg.embed.colours.default)
      .addField("username", interaction.client.user.tag, true)
      .addField("user id", `\`${interaction.client.user.id}\``, true)
      .addField(
        "created at",
        `<t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:f>`
      )
      .addField("owners", cfg.info.owner.ping.join(", "))
      .setFooter({
        text: `proudly serving ${interaction.client.users.cache.size} users on ${interaction.client.guilds.cache.size} servers and counting! ✨`,
      });

    // about the host
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
      .addField(`memory usage (${sysinfo.usageMemInfo})`, sysinfo.usageMemPrg)
      .setFooter({
        text: `made with ☕️ by ${cfg.info.owner.tag[0]}, with lots of 💖 from ${cfg.info.owner.tag[1]}`,
      });

    interaction.reply({ embeds: [general, host] });
  },
};
