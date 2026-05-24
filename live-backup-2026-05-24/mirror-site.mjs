import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = new URL("https://www.centroasdinsieme.it/");
const outDir = path.resolve("live-backup-2026-05-24");
const siteDir = path.join(outDir, "site");
const assetDir = path.join(outDir, "assets");

const urls = [
  "https://www.centroasdinsieme.it/",
  "https://www.centroasdinsieme.it/servizi/",
  "https://www.centroasdinsieme.it/servizi/servizio-di-neuropsichiatria-infantile/",
  "https://www.centroasdinsieme.it/servizi/valutazione-diagnostica-d-s-a/",
  "https://www.centroasdinsieme.it/servizi/doposcuola-specializzato-per-dislessia-disgrafia-discalculia-disortografia/",
  "https://www.centroasdinsieme.it/servizi/training-di-potenziamento-dell-attenzione-e-della-memoria/",
  "https://www.centroasdinsieme.it/servizi/logopedia/",
  "https://www.centroasdinsieme.it/servizi/neuropsicomotricit%C3%A0/",
  "https://www.centroasdinsieme.it/servizi/counseling/",
  "https://www.centroasdinsieme.it/servizi/dietistica/",
  "https://www.centroasdinsieme.it/servizi/fitness/",
  "https://www.centroasdinsieme.it/servizi/fitness/piloga/",
  "https://www.centroasdinsieme.it/servizi/fitness/body-sculpture/",
  "https://www.centroasdinsieme.it/servizi/fitness/ginnastica-posturale/",
  "https://www.centroasdinsieme.it/contatti/",
  "https://www.centroasdinsieme.it/about/",
];

const htmlByUrl = new Map();
const assetByUrl = new Map();

function localHtmlPath(urlString) {
  const url = new URL(urlString);
  const decoded = decodeURIComponent(url.pathname);
  if (decoded === "/") return path.join(siteDir, "index.html");
  return path.join(siteDir, decoded.replace(/^\/|\/$/g, ""), "index.html");
}

function assetName(urlString) {
  const url = new URL(urlString);
  const ext = path.extname(url.pathname).slice(0, 12);
  const slug = `${url.hostname}${url.pathname}${url.search}`
    .replace(/^www\./, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 180);
  return `${slug || "asset"}${ext && !slug.endsWith(ext) ? ext : ""}`;
}

function absolutize(candidate, base) {
  if (!candidate || candidate.startsWith("data:") || candidate.startsWith("mailto:") || candidate.startsWith("tel:") || candidate.startsWith("#")) {
    return null;
  }
  try {
    return new URL(candidate.replace(/&amp;/g, "&"), base).toString();
  } catch {
    return null;
  }
}

function collectAssets(html, pageUrl) {
  const found = new Set();
  const attrRegex = /\b(?:src|href|poster|content)=["']([^"']+)["']/gi;
  const srcsetRegex = /\bsrcset=["']([^"']+)["']/gi;
  const styleUrlRegex = /url\((["']?)([^"')]+)\1\)/gi;

  for (const match of html.matchAll(attrRegex)) {
    const absolute = absolutize(match[1], pageUrl);
    if (absolute && !absolute.startsWith(root.toString()) && !absolute.includes("centroasdinsieme.it")) found.add(absolute);
    if (absolute && /\.(?:css|js|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot)(?:[?#].*)?$/i.test(new URL(absolute).pathname)) found.add(absolute);
  }
  for (const match of html.matchAll(srcsetRegex)) {
    for (const part of match[1].split(",")) {
      const absolute = absolutize(part.trim().split(/\s+/)[0], pageUrl);
      if (absolute) found.add(absolute);
    }
  }
  for (const match of html.matchAll(styleUrlRegex)) {
    const absolute = absolutize(match[2], pageUrl);
    if (absolute) found.add(absolute);
  }
  return [...found].filter((url) => /\.(?:css|js|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot)(?:[?#].*)?$/i.test(new URL(url).pathname));
}

function rewriteHtml(html, pageUrl) {
  let rewritten = html;
  for (const url of urls) {
    const local = path.relative(path.dirname(localHtmlPath(pageUrl)), localHtmlPath(url)).replaceAll(path.sep, "/") || "index.html";
    rewritten = rewritten.replaceAll(url, local);
    const pathname = new URL(url).pathname;
    if (pathname !== "/") {
      rewritten = rewritten.replaceAll(`href="${pathname}"`, `href="${local}"`);
      rewritten = rewritten.replaceAll(`href='${pathname}'`, `href='${local}'`);
      const decodedPathname = decodeURIComponent(pathname);
      rewritten = rewritten.replaceAll(`href="${decodedPathname}"`, `href="${local}"`);
      rewritten = rewritten.replaceAll(`href='${decodedPathname}'`, `href='${local}'`);
    }
  }
  for (const [url, localName] of assetByUrl) {
    const local = path.relative(path.dirname(localHtmlPath(pageUrl)), path.join(assetDir, localName)).replaceAll(path.sep, "/");
    rewritten = rewritten.replaceAll(url, local);
    rewritten = rewritten.replaceAll(decodeURIComponent(url), local);
    rewritten = rewritten.replaceAll(url.replaceAll("&", "&amp;"), local);
  }
  return rewritten;
}

async function fetchBuffer(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

await mkdir(siteDir, { recursive: true });
await mkdir(assetDir, { recursive: true });

for (const url of urls) {
  const html = (await fetchBuffer(url)).toString("utf8");
  htmlByUrl.set(url, html);
  const destination = localHtmlPath(url);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const assets = new Set();
for (const [url, html] of htmlByUrl) {
  for (const asset of collectAssets(html, url)) assets.add(asset);
}

for (const url of assets) {
  const name = assetName(url);
  try {
    const buffer = await fetchBuffer(url);
    assetByUrl.set(url, name);
    await writeFile(path.join(assetDir, name), buffer);
    if (new URL(url).pathname.endsWith(".css")) {
      for (const nestedAsset of collectAssets(buffer.toString("utf8"), url)) {
        if (!assets.has(nestedAsset)) assets.add(nestedAsset);
      }
    }
  } catch (error) {
    console.warn(`Skipped ${url}: ${error.message}`);
  }
}

for (const [url, html] of htmlByUrl) {
  const destination = localHtmlPath(url);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, rewriteHtml(html, url));
}

const manifest = {
  source: root.toString(),
  capturedAt: new Date().toISOString(),
  pages: urls,
  assetCount: assetByUrl.size,
};
await writeFile(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Captured ${urls.length} pages and ${assetByUrl.size} assets in ${outDir}`);
