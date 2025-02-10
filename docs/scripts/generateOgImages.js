import fs from "fs";
import path from "path";
import { createContentLoader } from "vitepress";

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

// Image paths
const IMAGES = {
  BACKGROUND: "../open-graph-background.png",
  LOGO: "../logo.png",
};

function buildOgImage({ title, summary, pageUrl }) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
      <defs>
        <clipPath id="clip">
          <rect width="1200" height="630" rx="0"/>
        </clipPath>
      </defs>
      
      <image 
        href="${IMAGES.BACKGROUND}" 
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
          href="${IMAGES.LOGO}" 
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
        >${title}</text>
        <text 
          x="50" 
          y="400" 
          font-size="${FONT_SIZE.SUMMARY}"
          font-family="${FONT_FACE.SECONDARY}"
          fill="${COLORS.TEXT_PRIMARY}"
        >${summary}</text>
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

        const svg = buildOgImage({
          title: file.frontmatter?.title || "Shoko",
          summary: file.frontmatter?.description || "",
          pageUrl: `https://docs.shokoanime.com${file.url}`,
        });

        const filename = relativePath
          .replace(/\.md$/, "")
          .replace(/\//g, "_")
          .replace(/\s+/g, "-")
          .toLowerCase();

        fs.writeFileSync(path.join(outputDir, `${filename}.svg`), svg);
        console.log(`Generated OG image for ${filename}`);
      } catch (fileError) {
        console.error(`Error processing file ${file.url}:`, fileError);
      }
    }
  } catch (error) {
    console.error("Error generating OG images:", error);
  }
};
