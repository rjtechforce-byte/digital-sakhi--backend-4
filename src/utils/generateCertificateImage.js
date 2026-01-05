const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

async function generateCertificateImage({
  name,
  address,
  score,
  date,
  certificateId,
}) {
  const width = 1400;
  const height = 1000;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background image
  const bg = await loadImage(
    path.join(__dirname, "../assets/certificate-template.png")
  );
  ctx.drawImage(bg, 0, 0, width, height);

  ctx.fillStyle = "#1f2937";

  // NAME (center, big)
  ctx.textAlign = "center";
  ctx.font = "bold 50px Georgia";
  ctx.fillText(name, width / 2, 500);

  // ADDRESS (left)
  ctx.textAlign = "left";
  ctx.font = "28px Arial";
  ctx.fillText(address, 360, 540);

  // SCORE (center)
  ctx.textAlign = "center";
  ctx.font = "bold 32px Arial";
  ctx.fillText(score, width / 2 + 135, 615);

  // DATE (right)
  ctx.textAlign = "right";
  ctx.font = "28px Arial";
  ctx.fillText(date, width - 360, 577);

  // CERTIFICATE ID (bottom)
  ctx.textAlign = "center";
  ctx.font = "22px Arial";
  ctx.fillText(
    `${certificateId}`,
    width / 2,
    950
  );

  const outputPath = path.join(
    __dirname,
    `../certificates/${certificateId}.png`
  );

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);

  return outputPath;
}

module.exports = generateCertificateImage;
