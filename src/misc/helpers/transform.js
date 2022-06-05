const owoPrefixes = [
  "OwO",
  "hehe",
  "\\*nuzzles\\*",
  "\\*blushes\\*",
  "\\*giggles\\*",
  "\\*waises paw\\*",
  "\\*notices bulge\\*",
  "\\*unbuttons shirt\\*",
];

const owoSuffixes = [
  "(・`ω´・)",
  ";;w;;",
  "owo",
  "UwU",
  ">w<",
  "^w^",
  "OwO",
  ":3",
  ">~<",
  "•~•",
  "•v•",
  "•^^•",
  ">:3",
  "xox",
  ">3<",
  "hehe",
  "ɾ⚈▿⚈ɹ",
  "(・ω・)",
  "(ᗒᗨᗕ)",
  "murr~",
  "(*≧▽≦)",
  "( ﾟ∀ ﾟ)",
  "( ・ ̫・)",
  "(▰˘v˘▰)",
  "*gwomps*",
  "(ﾉ´ з `)ノ",
  "✾(〜 ☌ω☌)〜✾",
  "(´,,•ω•,,)♡",
  "( •́ .̫ •̀ )",
  "( ´ ▽ ` ).｡ｏ♡",
];

function owo(str) {
  return str
    .replace(/dog/g, "doggo")
    .replace(/cat/g, "kitteh")
    .replace(/DOG/g, "DOGGO")
    .replace(/CAT/g, "KITTEH")
    .replace(/kitten/g, "kitteh")
    .replace(/KITTEN/g, "KITTEH")
    .replace(/hell/g, "heck")
    .replace(/HELL/g, "HECK")
    .replace(/fuck/g, "fwick")
    .replace(/FUCK/g, "FWICK")
    .replace(/fuk/g, "fwick")
    .replace(/FUK/g, "FWICK")
    .replace(/fck/g, "fwick")
    .replace(/FCK/g, "FWICK")
    .replace(/fk/g, "fwick")
    .replace(/FK/g, "FWICK")
    .replace(/FUC/g, "FWICK")
    .replace(/fuc/g, "fwick")
    .replace(/shit/g, "shoot")
    .replace(/SHIT/g, "SHOOT")
    .replace(/sht/g, "shoot")
    .replace(/SHT/g, "SHOOT")
    .replace(/friend/g, "fwend")
    .replace(/FRIEND/g, "fwend")
    .replace(/fren/g, "fwen")
    .replace(/FREN/g, "FWEN")
    .replace(/stop/g, "stawp")
    .replace(/STOP/g, "STAWP")
    .replace(/god/g, "gosh")
    .replace(/GOD/g, "GOSH")
    .replace(/(?:penis|dick)/g, "peepee")
    .replace(/(?:PENIS|DICK)/g, "PEEPEE")
    .replace(/damn/g, "darn")
    .replace(/DAMN/g, "DARN")
    .replace(/(?:r|l)/g, "w")
    .replace(/(?:R|L)/g, "W")
    .replace(/n([aeiou])/g, "ny$1")
    .replace(/N([aeiou])/g, "Ny$1")
    .replace(/N([AEIOU])/g, "Ny$1")
    .replace(/PH/g, "FW")
    .replace(/ph/g, "fw")
    .replace(/pH/g, "fw")
    .replace(/Ph/g, "Fw")
    .replace(/ove/g, "uv")
    .replace(/OVE/g, "UV")
    .replace(/Ove/g, "Uv")
    .replace(/OvE/g, "Uv")
    .replace(/oVe/g, "uV");
}

module.exports = class transform {
  static owo(str) {
    return (
      owoPrefixes[Math.floor(Math.random() * owoPrefixes.length)] +
      " " +
      owo(str) +
      " " +
      owoSuffixes[Math.floor(Math.random() * owoSuffixes.length)]
    );
  }
};
