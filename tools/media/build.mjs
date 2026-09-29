// Builds every served image from the masters in /assets-src (never served directly).
// Output: /public/media/{anchors,regions,work}/<name>-<width>.{avif,webp,jpg}
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const src = (p) => path.join(root, "assets-src", p);
const out = (p) => path.join(root, "public/media", p);

// Chosen masters. K1 attempt 1 and K2 attempt 1 were approved; K3 is added when generated.
const ANCHORS = {
  k1: "anchors/k1-a1.jpg",
  k2: "anchors/k2-a1.jpg",
  k3: "anchors/k3-a1.jpg",
};

// Portrait (9:16) crop centers, as fractions of the master width.
const PORTRAIT_CENTER = { k1: 0.72, k2: 0.47, k3: 0.7 };

// K2 region windows (fractions of the master) for inner-page banners, 3:1.
const REGIONS = {
  voice: { cx: 0.24, cy: 0.23 },
  knowledge: { cx: 0.76, cy: 0.22 },
  operations: { cx: 0.2, cy: 0.77 },
  products: { cx: 0.68, cy: 0.74 },
};

const SCREENS = ["doctor-ai.jpg", "caption-cc.png", "lawyer-ai.png", "saloon.jpg", "meridian.jpg", "designt.png", "health-dashboard.jpg"];

async function emit(pipeline, base, widths) {
  for (const w of widths) {
    const img = pipeline.clone().resize({ width: w, withoutEnlargement: true });
    await Promise.all([
      img.clone().avif({ quality: 52, effort: 5 }).toFile(`${base}-${w}.avif`),
      img.clone().webp({ quality: 74 }).toFile(`${base}-${w}.webp`),
      img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${base}-${w}.jpg`),
    ]);
  }
}

function windowOf(meta, cx, cy, aspect, widthFrac) {
  const width = Math.round(meta.width * widthFrac);
  const height = Math.round(width / aspect);
  const left = Math.min(Math.max(0, Math.round(meta.width * cx - width / 2)), meta.width - width);
  const top = Math.min(Math.max(0, Math.round(meta.height * cy - height / 2)), meta.height - height);
  return { left, top, width, height };
}

for (const d of ["anchors", "regions", "work"]) mkdirSync(out(d), { recursive: true });

for (const [name, file] of Object.entries(ANCHORS)) {
  if (!existsSync(src(file))) { console.log(`skip ${name}: master not generated yet`); continue; }
  const master = sharp(src(file));
  const meta = await master.metadata();
  await emit(master, out(`anchors/${name}`), [960, 1600, 2560]);
  const h = meta.height, w = Math.round((h * 9) / 16);
  const left = Math.min(Math.max(0, Math.round(meta.width * PORTRAIT_CENTER[name] - w / 2)), meta.width - w);
  await emit(sharp(src(file)).extract({ left, top: 0, width: w, height: h }), out(`anchors/${name}-portrait`), [720, 1080]);
  console.log(`anchor ${name} done`);
}

if (existsSync(src(ANCHORS.k2))) {
  const meta = await sharp(src(ANCHORS.k2)).metadata();
  for (const [id, r] of Object.entries(REGIONS)) {
    const win = windowOf(meta, r.cx, r.cy, 3, 0.5);
    await emit(sharp(src(ANCHORS.k2)).extract(win), out(`regions/${id}`), [1200, 2000]);
  }
  // Veo V1 first frame: one-third crop centred on the channel junction.
  const f = windowOf(meta, 0.47, 0.55, 16 / 9, 1 / 3);
  await sharp(src(ANCHORS.k2)).extract(f).resize({ width: 1920 }).jpeg({ quality: 92 }).toFile(src("anchors/v1-first-frame.jpg"));
  await emit(sharp(src(ANCHORS.k2)).extract(f), out("anchors/k2-detail"), [960, 1600]);
  console.log("regions done");
}

for (const s of SCREENS) {
  const name = s.replace(/\.(png|jpg)$/, "");
  const img = sharp(src(`screens/${s}`));
  const meta = await img.metadata();
  const widths = [640, 1200].filter((w) => w <= meta.width).concat(meta.width < 640 ? [meta.width] : []);
  await emit(img, out(`work/${name}`), widths);
  console.log(`screen ${name} ${meta.width}x${meta.height}`);
}
