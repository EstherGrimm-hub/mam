import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const inputPath = path.join(projectRoot, "public/images/brand/logo-original.png");
const brandDirectory = path.dirname(inputPath);
const appDirectory = path.join(projectRoot, "app");
const cream = { r: 241, g: 232, b: 212 };

await mkdir(brandDirectory, { recursive: true });
await mkdir(appDirectory, { recursive: true });

const { data: source, info } = await sharp(inputPath)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const darkPixels = [];
for (let index = 0; index < source.length; index += info.channels) {
  const red = source[index];
  const green = source[index + 1];
  const blue = source[index + 2];
  if (Math.max(red, green, blue) < 140) darkPixels.push([red, green, blue]);
}
if (!darkPixels.length) throw new Error("Không tìm thấy nét logo trên ảnh nguồn.");

const foreground = [0, 1, 2].map((channel) => {
  const values = darkPixels.map((pixel) => pixel[channel]).sort((a, b) => a - b);
  return values[Math.floor(values.length / 2)];
});
const foregroundDistance = foreground.reduce((sum, channel) => sum + (255 - channel) ** 2, 0);

// Ước lượng độ phủ mực từ nền trắng và khử matte để viền không bị ám trắng.
const rgba = Buffer.alloc(info.width * info.height * 4);
let left = info.width;
let top = info.height;
let right = -1;
let bottom = -1;
for (let pixelIndex = 0; pixelIndex < info.width * info.height; pixelIndex += 1) {
  const sourceIndex = pixelIndex * info.channels;
  const outputIndex = pixelIndex * 4;
  const input = [source[sourceIndex], source[sourceIndex + 1], source[sourceIndex + 2]];
  const coverage = Math.max(0, Math.min(1,
    input.reduce((sum, channel, index) => sum + (255 - channel) * (255 - foreground[index]), 0) / foregroundDistance,
  ));
  if (coverage < 0.006) continue;

  const alpha = coverage >= 0.985 ? 255 : Math.round(coverage * 255);
  for (let channel = 0; channel < 3; channel += 1) {
    const unmatte = (input[channel] - 255 * (1 - coverage)) / coverage;
    rgba[outputIndex + channel] = Math.max(0, Math.min(255, Math.round(unmatte)));
  }
  rgba[outputIndex + 3] = alpha;

  const x = pixelIndex % info.width;
  const y = Math.floor(pixelIndex / info.width);
  left = Math.min(left, x);
  right = Math.max(right, x);
  top = Math.min(top, y);
  bottom = Math.max(bottom, y);
}
if (right < left || bottom < top) throw new Error("Không tìm thấy vùng logo để trim.");

const trimmedWidth = right - left + 1;
const trimmedHeight = bottom - top + 1;
const logoDark = await sharp(rgba, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .extract({ left, top, width: trimmedWidth, height: trimmedHeight })
  .resize({ width: 1200, kernel: "lanczos3" })
  .png()
  .toBuffer();
const darkMetadata = await sharp(logoDark).metadata();
const logoWidth = darkMetadata.width;
const logoHeight = darkMetadata.height;

await sharp(logoDark).toFile(path.join(brandDirectory, "logo-dark.png"));

const { data: darkRgba, info: darkInfo } = await sharp(logoDark)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const logoLightPixels = Buffer.from(darkRgba);
for (let index = 0; index < logoLightPixels.length; index += 4) {
  if (logoLightPixels[index + 3] === 0) continue;
  logoLightPixels[index] = cream.r;
  logoLightPixels[index + 1] = cream.g;
  logoLightPixels[index + 2] = cream.b;
}
const logoLight = await sharp(logoLightPixels, {
  raw: { width: darkInfo.width, height: darkInfo.height, channels: 4 },
}).png().toBuffer();
await sharp(logoLight).toFile(path.join(brandDirectory, "logo-light.png"));

const markBounds = {
  left: Math.round(info.width * 0.423),
  top: Math.round(info.height * 0.3075),
  width: Math.round(info.width * 0.148),
  height: Math.round(info.height * 0.3075),
};
let markLeft = markBounds.width;
let markTop = markBounds.height;
let markRight = -1;
let markBottom = -1;
for (let y = 0; y < markBounds.height; y += 1) {
  for (let x = 0; x < markBounds.width; x += 1) {
    const sourceIndex = ((markBounds.top + y) * info.width + markBounds.left + x) * 4 + 3;
    const alpha = rgba[sourceIndex];
    if (alpha > 4) {
      markLeft = Math.min(markLeft, x);
      markRight = Math.max(markRight, x);
      markTop = Math.min(markTop, y);
      markBottom = Math.max(markBottom, y);
    }
  }
}
if (markRight < markLeft || markBottom < markTop) throw new Error("Crop logo mark không chạm vào nét chữ ầ.");

const markContentWidth = markRight - markLeft + 1;
const markContentHeight = markBottom - markTop + 1;
const markCanvasSize = 512;
const markPadding = Math.round(markCanvasSize * 0.13);
const markFit = markCanvasSize - markPadding * 2;
const markScale = markFit / Math.max(markContentWidth, markContentHeight);
const markResizedWidth = Math.round(markContentWidth * markScale);
const markResizedHeight = Math.round(markContentHeight * markScale);
const markLeftPosition = Math.round((markCanvasSize - markResizedWidth) / 2);
const markTopPosition = Math.round((markCanvasSize - markResizedHeight) / 2);
const markDarkLayer = await sharp(rgba, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .extract({
    left: markBounds.left + markLeft,
    top: markBounds.top + markTop,
    width: markContentWidth,
    height: markContentHeight,
  })
  .resize(markResizedWidth, markResizedHeight, { kernel: "lanczos3" })
  .png()
  .toBuffer();

const markCanvas = await sharp({
  create: { width: markCanvasSize, height: markCanvasSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: markDarkLayer, left: markLeftPosition, top: markTopPosition }])
  .png()
  .toBuffer();
await sharp(markCanvas).toFile(path.join(brandDirectory, "logo-mark.png"));

const { data: markPixels, info: markInfo } = await sharp(markCanvas)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const markLightPixels = Buffer.from(markPixels);
for (let index = 0; index < markLightPixels.length; index += 4) {
  if (markLightPixels[index + 3] === 0) continue;
  markLightPixels[index] = cream.r;
  markLightPixels[index + 1] = cream.g;
  markLightPixels[index + 2] = cream.b;
}
const markLight = await sharp(markLightPixels, {
  raw: { width: markInfo.width, height: markInfo.height, channels: 4 },
}).png().toBuffer();
await sharp(markLight).toFile(path.join(brandDirectory, "logo-mark-light.png"));

async function writeAppIcon(size, filename) {
  const radius = Math.round(size * 0.12);
  const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#2F4A2B"/></svg>`);
  const markSize = Math.round(size * 0.74);
  const mark = await sharp(markLight).resize(markSize, markSize, { fit: "contain" }).png().toBuffer();
  await sharp(background)
    .composite([{ input: mark, left: Math.round((size - markSize) / 2), top: Math.round((size - markSize) / 2) }])
    .png()
    .toFile(path.join(appDirectory, filename));
}

await writeAppIcon(512, "icon.png");
await writeAppIcon(180, "apple-icon.png");

const ogLogoWidth = 720;
const ogLogoHeight = Math.round(ogLogoWidth * logoHeight / logoWidth);
const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#F1E8D4"/><text x="600" y="530" text-anchor="middle" fill="#2F4A2B" font-family="Arial" font-size="32">Từ thiên nhiên, nuôi dưỡng vẻ đẹp Việt</text></svg>`);
const ogLogo = await sharp(logoDark).resize({ width: ogLogoWidth, height: ogLogoHeight }).png().toBuffer();
await sharp(ogSvg)
  .composite([{ input: ogLogo, left: Math.round((1200 - ogLogoWidth) / 2), top: 92 }])
  .png()
  .toFile(path.join(projectRoot, "public/images/og-default.png"));

console.log(JSON.stringify({
  source: { width: info.width, height: info.height },
  foreground,
  trimmedLogo: { width: logoWidth, height: logoHeight, bounds: { left, top, width: trimmedWidth, height: trimmedHeight } },
  markCrop: { left: markBounds.left, top: markBounds.top, width: markBounds.width, height: markBounds.height, content: { width: markContentWidth, height: markContentHeight } },
  outputs: ["logo-dark.png", "logo-light.png", "logo-mark.png", "logo-mark-light.png", "app/icon.png", "app/apple-icon.png", "public/images/og-default.png"],
}, null, 2));