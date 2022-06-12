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

function commit() {
  if (!execSync("git --version").toString().includes("not")) {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } else {
    // this doesn't even work lmao it just dies itself
    print.warn(
      "git wasn't found, make sure to add git to the PATH variable to use $update and $statistics."
    );
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("statistics")
    .setDescription("get current statistics on this bot")
    .addStringOption((option) =>
      option
        .setName("detail")
        .setDescription(
          "choose the amount of detail of content you want to see!"
        )
        .setRequired(false)
        .addChoices(
          { name: "general", value: "general" },
          { name: "host", value: "host" },
          { name: "nerd", value: "nerd" }
        )
    ),
  async execute(interaction) {
    const opt = interaction.options.getString("detail");

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

    // #region general embed
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
    // #endregion

    // #region about the host
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
    // #endregion

    // #region nerdy statistics
    // system information
    function hackintosh() {
      if (hostinfo.sys.manufacturer === "Acidanthera") return true;

      return false;
    }

    function bootMode() {
      const parsedBoot = hostinfo.os.sys.uefi
        .toString()
        .replace("true", "UEFI")
        .replace("false", "CSM/Legacy");

      if (
        hostinfo.os.sys.distro === "macOS" ||
        hostinfo.os.sys.distro === "Mac OS X"
      )
        return parsedBoot.replace("UEFI", "Apple EFI");
      return parsedBoot;
    }

    const board = new MessageEmbed()
      .setTitle(`🖥 system`)
      .setColor(cfg.embed.colours.default)
      .addField("manufacturer", hostinfo.sys.manufacturer || "???", true)
      .addField("model", smbios(hostinfo.sys.model) || "???", true)
      .addField("stock unit", hostinfo.sys.sku || "???", true)
      .addField("revision", hostinfo.sys.version || "???", true)
      .addField(
        "virtualised",
        hostinfo.sys.virtual
          .toString()
          .replace("true", "yes")
          .replace("false", "no"),
        true
      )
      .addField(
        "hackintosh",
        hackintosh().toString().replace("true", "yes").replace("false", "no"),
        true
      );

    const cpu = new MessageEmbed()
      .setTitle(`🦋 processor`)
      .setColor(cfg.embed.colours.default)
      .addField("manufacturer", hostinfo.cpu.manufacturer || "???", true)
      .addField("vendor", hostinfo.cpu.vendor || "???", true)
      .addField("brand", hostinfo.cpu.brand || "???", true)
      .addField("family", hostinfo.cpu.family || "???", true)
      .addField("model", hostinfo.cpu.model || "???", true)
      .addField("stepping", hostinfo.cpu.stepping || "???", true)
      .addField("base clock", (hostinfo.cpu.speed || "???") + " GHz", true)
      .addField("min speed", (hostinfo.cpu.speedMin || "???") + " GHz", true)
      .addField("max speed", (hostinfo.cpu.speedMax || "???") + " GHz", true)
      .addField(
        "num of CPUs",
        hostinfo.cpu.processors.toString() || "???",
        true
      )
      .addField("cores", hostinfo.cpu.physicalCores.toString() || "???", true)
      .addField("threads", hostinfo.cpu.cores.toString() || "???", true)
      .addField(
        "supported features",
        "```\n" + hostinfo.cpu.flags.replaceAll(" ", ", ") + "\n```" || "???"
      );

    const mem = new MessageEmbed()
      .setTitle(`📋 memory`)
      .setColor(cfg.embed.colours.default)
      .addField(
        "total memory",
        (Math.floor(hostinfo.mem.info.total / 1073741824) || "???") +
          " gigabytes",
        true
      )
      .addField("type", hostinfo.mem.layout[0].type || "???", true)
      .addField(
        "clock speed",
        (hostinfo.mem.layout[0].clockSpeed || "???") + " MHz",
        true
      )
      .addField(
        "error-correcting",
        hostinfo.mem.layout[0].ecc
          .toString()
          .replace(true, "yes")
          .replace(false, "no") || "???",
        true
      )
      .addField("form-factor", hostinfo.mem.layout[0].formFactor || "???", true)
      .addField("slot", hostinfo.mem.layout[0].bank || "???", true)
      .addField(
        "voltage",
        hostinfo.mem.layout[0].voltageConfigured || "???",
        true
      )
      .addField("min voltage", hostinfo.mem.layout[0].voltageMin || "???", true)
      .addField(
        "max voltage",
        hostinfo.mem.layout[0].voltageMax || "???",
        true
      );

    const gfx = new MessageEmbed()
      .setTitle(`👾 graphics`)
      .setColor(cfg.embed.colours.default)
      .addField("vendor", hostinfo.gfx.controllers[0].vendor || "???", true)
      .addField("model", hostinfo.gfx.controllers[0].model || "???", true)
      .addField(
        "connection",
        hostinfo.gfx.controllers[0].bus ||
          hostinfo.gfx.controllers[0].busAddress ||
          "???",
        true
      )
      .addField(
        "dynamic vram",
        hostinfo.gfx.controllers[0].vramDynamic
          .toString()
          .replace("true", "yes")
          .replace("false", "no") || "???",
        true
      )
      .addField(
        "video memory",
        (hostinfo.gfx.controllers[0].vram || "???") + " MB",
        true
      )
      .addField(
        "metal version",
        hostinfo.gfx.controllers[0].metalVersion || "not on macOS",
        true
      );

    const ops = new MessageEmbed()
      .setTitle(`🌱 operating system`)
      .setColor(cfg.embed.colours.default)
      .addField("distribution", hostinfo.os.sys.distro || "???", true)
      .addField("release", hostinfo.os.sys.release || "???", true)
      .addField(
        "codename",
        hostinfo.os.sys.codename
          .replace("macOS ", "")
          .replace("Mac OS X ", "") || "???",
        true
      )
      .addField("build", hostinfo.os.sys.build || "???", true)
      .addField("platform", hostinfo.os.sys.platform || "???", true)
      .addField("kernel version", hostinfo.os.sys.kernel || "???", true)
      .addField("fqdn", hostinfo.os.sys.fqdn || "???", true)
      .addField("boot mode", bootMode() || "???", true)
      .addField("default shell", hostinfo.os.shell || "???", true)
      .addField(
        "service pack",
        hostinfo.os.sys.servicepack || "not on Windows",
        true
      )
      .addField(
        "under hyper-v",
        hostinfo.os.sys.hypervizor || "not on Windows",
        true
      )
      .addField(
        "through rdp",
        hostinfo.os.sys.remoteSession || "not on Windows",
        true
      );

    const sw = new MessageEmbed()
      .setTitle(`🌸 software`)
      .setColor(cfg.embed.colours.default);

    Object.entries(hostinfo.os.ver).forEach(([k, v]) => {
      if (!v || k === "kernel") return;
      sw.addField(k, v, true);
    });

    const disks = new MessageEmbed()
      .setTitle(`👢 boot drive`)
      .setColor(cfg.embed.colours.default)
      .addField("name", hostinfo.disk[0].name || "???", true)
      .addField("vendor", hostinfo.disk[0].vendor || "???", true)
      .addField(
        "size",
        (Math.floor(hostinfo.disk[0].size / 1073741824) || "???") + " GB",
        true
      )
      .addField("device", hostinfo.disk[0].device || "???", true)
      .addField(
        "type",
        hostinfo.disk[0].type
          .replace("HD", "Hard Disk Drive")
          .replace("SSD", "Solid State Drive")
          .replace("NVMe", "Solid State Drive over NVMe") || "???",
        true
      )
      .addField("interface", hostinfo.disk[0].interfaceType || "???", true)
      .addField("firmware", hostinfo.disk[0].firmwareRevision || "???", true)
      .addField("temperature", hostinfo.disk[0].temperature || "???", true)
      .addField(
        "S.M.A.R.T. status",
        hostinfo.disk[0].smartStatus.replace("unknown", "???") || "???",
        true
      );

    const usb = new MessageEmbed()
      .setTitle(`🍆 usb controller`)
      .setColor(cfg.embed.colours.default)
      .addField("name", hostinfo.usb[0].name || "???", true)
      .addField("type", hostinfo.usb[0].type || "???", true)
      .addField(
        "removable",
        (hostinfo.usb[0].removable || "???")
          .toString()
          .replace("true", "yes")
          .replace("false", "no"),
        true
      )
      .addField("vendor", hostinfo.usb[0].vendor || "???", true)
      .addField("manufacturer", hostinfo.usb[0].manufacturer || "???", true)
      .addField("max power", hostinfo.usb[0].maxPower || "???", true);
    // #endregion

    if (!opt) return interaction.reply({ embeds: [general, host] });
    if (opt === "general") return interaction.reply({ embeds: [general] });
    if (opt === "host") return interaction.reply({ embeds: [host] });
    if (opt === "nerd")
      return interaction.reply({
        embeds: [board, cpu, mem, gfx, ops, sw, disks, usb],
      });

    interaction.reply({
      content: "you specified an invalid detail level!",
      ephemeral: true,
    });
  },
};
