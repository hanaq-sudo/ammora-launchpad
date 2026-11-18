const fs = require("fs");

const file = "src/app/page.tsx";
let s = fs.readFileSync(file, "utf8");

fs.copyFileSync(file, file + ".before-brand-colors.bak");

const replacements = [
  ['className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-black"',
   'className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-600 text-xl font-black shadow-lg shadow-cyan-500/20"'],

  ["from-[#21164a] via-[#15152e] to-[#101827]", "from-[#102c61] via-[#101d42] to-[#090f24]"],
  ["bg-[#080b14]", "bg-[#070b18]"],
  ["bg-[#0b0f1a]", "bg-[#091329]"],
  ["bg-[#101522]", "bg-[#0d1831]"],

  ["border-violet-400/20", "border-cyan-400/20"],
  ["border-violet-400/30", "border-cyan-400/30"],
  ["border-violet-300/20", "border-cyan-300/20"],
  ["bg-violet-600/20", "bg-blue-600/25"],
  ["bg-violet-500/15", "bg-cyan-400/10"],
  ["bg-violet-500/10", "bg-cyan-400/10"],
  ["bg-violet-300/10", "bg-cyan-300/10"],
  ["text-violet-400", "text-cyan-300"],
  ["text-violet-300", "text-cyan-300"],
  ["text-violet-200", "text-cyan-100"],
  ["bg-violet-600", "bg-blue-600"],
  ["bg-violet-500", "bg-blue-600"],
  ["hover:bg-violet-500", "hover:bg-cyan-500"],
  ["hover:bg-violet-400", "hover:bg-cyan-400"],
  ["from-violet-600", "from-blue-600"],
  ["to-fuchsia-400", "to-cyan-300"],
  ["shadow-violet-500", "shadow-cyan-500"],
];

for (const [oldValue, newValue] of replacements) {
  s = s.split(oldValue).join(newValue);
}

fs.writeFileSync(file, s, "utf8");
console.log("Warna Ammora berhasil diperbarui.");
console.log("Backup tersimpan: " + file + ".before-brand-colors.bak");
