// The Printer Apology — R1 entry program.
// Reads the single-line apology from entry.txt beside this file and
// writes it to $MAKEFUN_OUTPUT_DIR/entry.txt (Node stdlib only).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const entry = readFileSync(entryPath, "utf8").trim();
if (!entry) throw new Error("entry.txt is empty — nothing to apologise for");
const charCount = entry.length;
const preview = entry.length > 40 ? entry.slice(0, 40) + "…" : entry;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`Printer apologises (${charCount} chars): "${preview}" → ${join(outDir, "entry.txt")}`);
