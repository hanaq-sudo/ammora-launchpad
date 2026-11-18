const fs = require("fs");

const file = "src/app/page.tsx";
let s = fs.readFileSync(file, "utf8");

function replaceOnce(oldText, newText, label) {
  const count = s.split(oldText).length - 1;
  if (count !== 1) {
    throw new Error(`${label}: ditemukan ${count} kali, file tidak diubah.`);
  }
  s = s.replace(oldText, newText);
}

replaceOnce(
  'import { useMemo, useState } from "react";',
  'import { useEffect, useMemo, useState } from "react";',
  "Import React"
);

replaceOnce(
  'export default function Home() {',
  `type TokenHistoryItem = {
  name: string;
  symbol: string;
  address: string;
  creator: string;
  txHash: string;
  createdAt: string;
  metadataURI: string;
};

const HISTORY_KEY = "ammora-token-history";

const initialToken: TokenHistoryItem = {
  name: "Ammora Test Token",
  symbol: "ATT",
  address: "0xD9ea635D7b80666A475FBCABd45A258637a3B180",
  creator: "0xf8be7379E9506b8eE2445A3e9dfEE43B4A1e8dF5",
  txHash: "0x8b29e69689106eff75a39956f63cf396cb0752fdf680e309ad3bf8c227b98ea0",
  createdAt: "2026-11-18T16:04:38+07:00",
  metadataURI: "ipfs://bafkreieesot6bfuux6z34sm73uknvdbhlanhrkgxsttevrw543dy35xh2i",
};

export default function Home() {`,
  "Tipe dan data token awal"
);

replaceOnce(
  '  const [tokenAddress, setTokenAddress] = useState("");',
  `  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenHistory, setTokenHistory] = useState<TokenHistoryItem[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      const items: TokenHistoryItem[] = Array.isArray(parsed) ? parsed : [];

      if (!items.some((item) => item.address?.toLowerCase() === initialToken.address.toLowerCase())) {
        items.unshift(initialToken);
      }

      setTokenHistory(items);
    } catch {
      setTokenHistory([initialToken]);
    }
    setHistoryLoaded(true);
  }, []);

  useEffect(() => {
    if (historyLoaded) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(tokenHistory));
    }
  }, [tokenHistory, historyLoaded]);`,
  "State dan penyimpanan riwayat"
);

replaceOnce(
  '      setTokenAddress(actualTokenAddress);',
  `      setTokenAddress(actualTokenAddress);
      const createdItem: TokenHistoryItem = {
        name: tokenName.trim(),
        symbol: tokenSymbol.trim().toUpperCase(),
        address: actualTokenAddress,
        creator: account,
        txHash: hash,
        createdAt: new Date().toISOString(),
        metadataURI: metadataURI.trim(),
      };
      setTokenHistory((previous) => [
        createdItem,
        ...previous.filter((item) => item.address.toLowerCase() !== actualTokenAddress.toLowerCase()),
      ]);`,
  "Simpan token baru"
);

replaceOnce(
  '          <div className="mx-auto max-w-7xl px-5 py-9 md:px-10 md:py-12">',
  `          {active === "My Tokens" ? (
            <div className="mx-auto max-w-7xl px-5 py-9 md:px-10 md:py-12">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">Your portfolio</div>
                  <h1 className="text-3xl font-bold">My Tokens</h1>
                  <p className="mt-2 text-sm text-slate-400">Token yang kamu buat melalui Ammora Launchpad.</p>
                </div>
                <button onClick={() => { setActive("Explore"); setModal(true); }} className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500">＋ Create token</button>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.07] bg-[#101522] p-5">
                  <div className="text-xs text-slate-400">Your launches</div>
                  <div className="mt-2 text-3xl font-bold">{tokenHistory.length}</div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-[#101522] p-5">
                  <div className="text-xs text-slate-400">Network</div>
                  <div className="mt-2 text-3xl font-bold">GIWA <span className="text-sm font-medium text-emerald-300">Sepolia</span></div>
                </div>
              </div>

              {!historyLoaded ? (
                <div className="rounded-2xl border border-white/[0.08] bg-[#101522] p-8 text-center text-sm text-slate-400">Loading token history...</div>
              ) : tokenHistory.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-[#101522] p-10 text-center">
                  <div className="text-lg font-semibold">Belum ada token</div>
                  <p className="mt-2 text-sm text-slate-400">Token yang kamu buat akan muncul di sini.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tokenHistory.map((item) => (
                    <article key={item.address} className="rounded-2xl border border-white/[0.08] bg-[#101522] p-5 md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-lg font-black">{item.symbol.slice(0, 1)}</div>
                          <div>
                            <h2 className="font-bold">{item.name}</h2>
                            <p className="mt-1 text-xs text-slate-400">\${item.symbol}</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-300">Created · GIWA Sepolia</span>
                      </div>

                      <div className="mt-6 grid gap-4 border-t border-white/[0.07] pt-5 md:grid-cols-2">
                        <div>
                          <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">Token contract</div>
                          <div className="break-all text-xs text-slate-300">{item.address}</div>
                          <a className="mt-2 inline-block text-xs font-semibold text-violet-300 hover:text-violet-200" href={\`https://sepolia-explorer.giwa.io/address/\${item.address}\`} target="_blank" rel="noreferrer">View contract ↗</a>
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">Creator wallet</div>
                          <div className="break-all text-xs text-slate-300">{item.creator}</div>
                          <div className="mb-1 mt-4 text-[10px] uppercase tracking-wider text-slate-500">Created at</div>
                          <div className="text-xs text-slate-300">{new Date(item.createdAt).toLocaleString("id-ID")}</div>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-white/[0.07] pt-4">
                        <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">Transaction hash</div>
                        <div className="break-all text-xs text-slate-400">{item.txHash}</div>
                        <a className="mt-2 inline-block text-xs font-semibold text-violet-300 hover:text-violet-200" href={\`https://sepolia-explorer.giwa.io/tx/\${item.txHash}\`} target="_blank" rel="noreferrer">View transaction ↗</a>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-xs leading-5 text-amber-200/80">
                Riwayat ini disimpan di browser yang sedang digunakan. Jika data browser dihapus atau kamu berpindah perangkat/browser, riwayat lokal ini tidak otomatis ikut berpindah.
              </div>
              <footer className="mt-12 border-t border-white/[0.07] pt-6 text-center text-[11px] text-slate-600">AMMORA LAUNCHPAD · BUILT WITH AMMORA SDK · GIWA SEPOLIA</footer>
            </div>
          ) : (
          <div className="mx-auto max-w-7xl px-5 py-9 md:px-10 md:py-12">`,
  "Tampilan My Tokens"
);

replaceOnce(
  '            <footer className="mt-12 border-t border-white/[0.07] pt-6 text-center text-[11px] text-slate-600">AMMORA LAUNCHPAD · BUILT WITH AMMORA SDK · GIWA SEPOLIA</footer>\n          </div>\n        </section>',
  '            <footer className="mt-12 border-t border-white/[0.07] pt-6 text-center text-[11px] text-slate-600">AMMORA LAUNCHPAD · BUILT WITH AMMORA SDK · GIWA SEPOLIA</footer>\n          </div>\n          )}\n        </section>',
  "Penutup tampilan Explore"
);

fs.copyFileSync(file, file + ".before-history.bak");
fs.writeFileSync(file, s, "utf8");
console.log("My Tokens berhasil dipasang. Backup: " + file + ".before-history.bak");

