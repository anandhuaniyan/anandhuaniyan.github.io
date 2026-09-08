import { readFile, mkdir, copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";
const html = await readFile("index.html", "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
if (new Set(ids).size !== ids.length) throw new Error("Duplicate HTML IDs");
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g))
  if (!ids.includes(anchor)) throw new Error(`Missing anchor: ${anchor}`);
for (const [, path] of html.matchAll(
  /(?:src|href)="((?!https?:|mailto:|tel:|#)[^"]+)"/g,
))
  await readFile(path);
for (const [, json] of html.matchAll(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
))
  JSON.parse(json);
const pdf = await readFile("assets/Anandhu_Aniyan_Resume.pdf");
if (pdf.subarray(0, 5).toString() !== "%PDF-")
  throw new Error("Invalid resume PDF");
await mkdir("dist/assets", { recursive: true });
for (const file of [
  "index.html",
  "styles.css",
  "script.js",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  ".nojekyll",
])
  await copyFile(file, join("dist", file));
for (const file of await readdir("assets"))
  await copyFile(join("assets", file), join("dist/assets", file));
console.log(
  "Static production build passed: anchors, local assets, structured data and resume PDF verified.",
);
