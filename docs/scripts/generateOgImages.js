import fs from "fs";
import path from "path";
import { createContentLoader } from "vitepress";
import sharp from "sharp";

// Colors
const COLORS = {
  OVERLAY: "rgba(23, 24, 31, 0.9)",
  TEXT_PRIMARY: "rgba(203, 213, 225, 1)",
  TEXT_SECONDARY: "rgba(203, 213, 225, 0.75)",
};

// Font sizes
const FONT_SIZE = {
  BRAND: "42px",
  TAGLINE: "24px",
  TITLE: "48px",
  SUMMARY: "24px",
  URL: "14px",
};

// Font families
const FONT_FACE = {
  PRIMARY: "Roboto",
  SECONDARY: "Roboto",
};

// Image paths relative to project root
const IMAGES = {
  BACKGROUND: path.resolve(process.cwd(), "docs/public/images/open-graph-background.png"),
  LOGO: path.resolve(process.cwd(), "docs/public/images/logo.png"),
};

// Function to convert image to base64
async function imageToBase64(imagePath) {
  try {
    const imageBuffer = await fs.promises.readFile(imagePath);
    return `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error loading image ${imagePath}:`, error);
    return null;
  }
}

// Text wrapping function
function wrapText(text, maxWidth, fontSize) {
  const avgCharWidth = fontSize * 0.6;
  const charsPerLine = Math.floor(maxWidth / avgCharWidth);
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    if (currentLine.length + words[i].length + 1 <= charsPerLine) {
      currentLine += ' ' + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);

  return lines;
}

async function buildOgImage({ title, summary, pageUrl }) {
  // Load images as base64
  const backgroundBase64 = await imageToBase64(IMAGES.BACKGROUND);
  const logoBase64 = await imageToBase64(IMAGES.LOGO);

  if (!backgroundBase64 || !logoBase64) {
    throw new Error('Failed to load required images');
  }

  // Calculate wrapped text
  const titleLines = wrapText(title, 1000, parseInt(FONT_SIZE.TITLE));
  const summaryLines = wrapText(summary, 1100, parseInt(FONT_SIZE.SUMMARY));

  // Generate title tspans with 1.5 line height
  const titleTspans = titleLines.map((line, index) =>
    `<tspan x="50" dy="${index === 0 ? '0' : '1.5em'}">${line}</tspan>`
  ).join('');

  // Generate summary tspans with 1.5 line height
  const summaryTspans = summaryLines.map((line, index) =>
    `<tspan x="50" dy="${index === 0 ? '0' : '1.5em'}">${line}</tspan>`
  ).join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
      <defs>
        <clipPath id="clip">
          <rect width="1200" height="630" rx="0"/>
        </clipPath>
      </defs>
      
      <image 
        href="${backgroundBase64}" 
        width="1200" 
        height="630" 
        clip-path="url(#clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      
      <rect 
        width="1200" 
        height="630" 
        fill="${COLORS.OVERLAY}"
      />
      
      <g>
        <image 
          href="${logoBase64}" 
          x="50" 
          y="55" 
          width="117" 
          height="100"
        />
        <text 
          x="187" 
          y="105" 
          font-size="${FONT_SIZE.BRAND}"
          font-family="${FONT_FACE.PRIMARY}" 
          fill="${COLORS.TEXT_PRIMARY}"
        >Shoko</text>
        <text 
          x="187" 
          y="140" 
          font-size="${FONT_SIZE.TAGLINE}"
          font-family="${FONT_FACE.PRIMARY}"
          fill="${COLORS.TEXT_PRIMARY}"
        >Anime Management, Automated</text>
        
        <text 
          x="50" 
          y="350" 
          font-size="${FONT_SIZE.TITLE}"
          font-family="${FONT_FACE.PRIMARY}"
          font-weight="bold" 
          fill="${COLORS.TEXT_PRIMARY}"
        >${titleTspans}</text>
        
        <text 
          x="50" 
          y="400" 
          font-size="${FONT_SIZE.SUMMARY}"
          font-family="${FONT_FACE.SECONDARY}"
          fill="${COLORS.TEXT_PRIMARY}"
        >${summaryTspans}</text>
        
        <text 
          x="50" 
          y="550" 
          font-size="${FONT_SIZE.URL}"
          font-family="${FONT_FACE.SECONDARY}"
          fill="${COLORS.TEXT_SECONDARY}"
        >${pageUrl}</text>
      </g>
    </svg>
  `;
}

async function convertSvgToPng(svgBuffer, outputPath) {
  try {
    await sharp(Buffer.from(svgBuffer))
      .png()
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    return false;
  }
}

export const generateOgImages = async (config) => {
  try {
    // Get the output directory from VitePress config
    const outDir = config?.outDir;
    const outputDir = path.join(outDir, "images/og-images");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = await createContentLoader("**/*.md").load();

    for (const file of files) {
      try {
        const relativePath = file.url.replace(/^\//, "") + ".md";

        const svg = await buildOgImage({
          title: file.frontmatter?.title || "Shoko",
          summary: file.frontmatter?.description || "",
          pageUrl: `https://docs.shokoanime.com${file.url}`,
        });

        const filename = relativePath
          .replace(/\.md$/, "")
          .replace(/\//g, "_")
          .replace(/\s+/g, "-")
          .toLowerCase();

        // Convert directly to PNG without saving SVG
        const pngPath = path.join(outputDir, `${filename}.png`);
        await convertSvgToPng(svg, pngPath);

        console.log(`Generated PNG OG image for ${filename}`);
      } catch (fileError) {
        console.error(`Error processing file ${file.url}:`, fileError);
      }
    }
  } catch (error) {
    console.error("Error generating OG images:", error);
  }
};
