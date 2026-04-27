import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourceDir = path.join(rootDir, "almaty collection photos");
const outputDir = path.join(rootDir, "photos", "photography", "almaty");
const thumbsDir = path.join(outputDir, "thumbs");
const fullDir = path.join(outputDir, "full");
const contentPath = path.join(rootDir, "content", "almaty-collection.js");

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleize(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function runMagick(args) {
  execFileSync("magick", args, { stdio: "inherit" });
}

function identifyDimensions(filePath) {
  const output = execFileSync("magick", ["identify", "-format", "%w %h", filePath], {
    encoding: "utf8",
  }).trim();
  const [width, height] = output.split(/\s+/).map(Number);
  return { width, height };
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Source folder not found: ${sourceDir}`);
  process.exit(1);
}

ensureDir(thumbsDir);
ensureDir(fullDir);

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((fileName) => supportedExtensions.has(path.extname(fileName).toLowerCase()))
  .sort((left, right) => left.localeCompare(right, "en"));

const slugCounts = new Map();
const photos = [];

for (const fileName of sourceFiles) {
  const baseName = path.basename(fileName, path.extname(fileName));
  const sourcePath = path.join(sourceDir, fileName);

  let slug = slugify(baseName) || "photo";
  const priorCount = slugCounts.get(slug) || 0;
  slugCounts.set(slug, priorCount + 1);
  if (priorCount > 0) {
    slug = `${slug}-${priorCount + 1}`;
  }

  const thumbPath = path.join(thumbsDir, `${slug}.jpg`);
  const fullPath = path.join(fullDir, `${slug}.jpg`);

  runMagick([
    sourcePath,
    "-auto-orient",
    "-strip",
    "-resize",
    "720x720>",
    "-sampling-factor",
    "4:2:0",
    "-interlace",
    "Plane",
    "-quality",
    "78",
    thumbPath,
  ]);

  runMagick([
    sourcePath,
    "-auto-orient",
    "-strip",
    "-resize",
    "1800x1800>",
    "-sampling-factor",
    "4:2:0",
    "-interlace",
    "Plane",
    "-quality",
    "82",
    fullPath,
  ]);

  const { width, height } = identifyDimensions(fullPath);

  photos.push({
    title: titleize(baseName),
    alt: `Almaty collection photo: ${titleize(baseName)}`,
    thumbSrc: `/photos/photography/almaty/thumbs/${slug}.jpg`,
    fullSrc: `/photos/photography/almaty/full/${slug}.jpg`,
    width,
    height,
  });
}

const fileContents = `window.SITE_CONTENT = {
  photoCollection: {
    meta: "Arts Collection",
    title: "Almaty Collection",
    intro: "City views, mountains, and everyday scenes from Almaty, Kazakhstan.",
    backHref: "/photography/",
    backLabel: "All Collections",
    photos: ${JSON.stringify(photos, null, 6)},
  },
};
`;

fs.writeFileSync(contentPath, fileContents);

console.log(`Built ${photos.length} Almaty photos.`);
