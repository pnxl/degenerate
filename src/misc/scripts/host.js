const si = require("systeminformation");
const { writeFileSync } = require("fs");

/*
module.exports = {
  os: `${(await os.osInfo()).distro} ${(await os.osInfo()).release} (${
    (await os.osInfo()).arch
  })`,
  host: (await os.osInfo()).hostname,
  pkg: `Node.js ${process.version}, Discord.js v${package.dependencies[
    "discord.js"
  ].slice(1)}`,
  ver: `v${package.version}, commit \`${commit()}\``,

  manu: `${(await os.system()).manufacturer.replace(
    "Acidanthera",
    "Apple"
  )} ${smbios((await os.system()).model)}`,
  cpu: `${(await os.cpu()).manufacturer} ${(await os.cpu()).brand} ${
    (await os.cpu()).speed
  } GHz (${(await os.cpu()).physicalCores}c, ${(await os.cpu()).cores}t)`,
  mem: `${(await os.mem()).total / 1073741824} GB @ ${
    (await os.memLayout())[0].clockSpeed
  } MHz`,
  uptime: timeconv(os.time().uptime),

  usageCpuPrg: `${progress(usages.cpu)} ${usages.cpu}%`,
  usageCpuInfo: (await os.cpu()).cores,

  usageMemPrg: `${progress(usages.mem)} ${usages.mem}%`,
  usageMemInfo: `${Math.round(
    (await os.mem()).free / 1073741824
  )} GB free out of ${Math.round(
    (await os.mem()).total / 1073741824
  )} GB total`,
};
*/

async function spitOutInformationNowGodDamnIt() {
  // prettier-ignore
  const data = `{
    "sys": ${JSON.stringify(await si.system())}, 
    "cpu": ${JSON.stringify(await si.cpu())},
    "mem": {
      "info": ${JSON.stringify(await si.mem())},
      "layout": ${JSON.stringify(await si.memLayout())}
    },
    "batt": ${JSON.stringify(await si.battery())},
    "gfx": ${JSON.stringify(await si.graphics())},
    "os": {
      "sys": ${JSON.stringify(await si.osInfo())},
      "shell": ${JSON.stringify(await si.shell())},
      "ver": ${JSON.stringify(await si.versions())},
      "usr": ${JSON.stringify(await si.users())}
    },
    "disk": {
      "phys": {
        "layout": ${JSON.stringify(await si.diskLayout())},
        "dev": ${JSON.stringify(await si.blockDevices())}
      },
      "fs": {
        "size": ${JSON.stringify(await si.fsSize())},
        "open": ${JSON.stringify(await si.fsOpenFiles())}
      }
    },
    "usb": ${JSON.stringify(await si.usb())},
    "prn": ${JSON.stringify(await si.printer())},
    "aud": ${JSON.stringify(await si.audio())},
    "nic": ${JSON.stringify(await si.networkInterfaces())},
    "wifi": ${JSON.stringify(await si.wifiInterfaces())}
  }`;

  writeFileSync("./src/misc/assets/misc/helpers/host.json", data);
}

spitOutInformationNowGodDamnIt();
