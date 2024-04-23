import { execSync } from 'child_process';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Helper functions to handle file paths with ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const DOCS_DIRECTORY = path.join(__dirname, '../src/content/docs');
const EXCLUDE_FILES = ['index', '404'];
const OUTPUT_FILE_PATH = path.join(
 __dirname,
 '../public/files/last-updated.json'
);
const WORD_REPLACEMENTS = {
 faq: 'FAQ',
 webui: 'Web UI',
 shokorelay: 'ShokoRelay',
};

// Function to get the last updated date from Git
function getGitLastUpdated(filePath) {
 try {
  const stdout = execSync(`git log -1 --format="%ad" -- "${filePath}"`);
  return new Date(stdout.toString().trim());
 } catch (error) {
  console.error(`Error fetching last updated date for ${filePath}:`, error);
  return new Date();
 }
}

// Recursive function to read all files in a directory and its subdirectories
function getAllFiles(dirPath, basePath, arrayOfFiles = []) {
 const files = readdirSync(dirPath);
 files.forEach((file) => {
  const filePath = path.join(dirPath, file);
  if (statSync(filePath).isDirectory()) {
   arrayOfFiles = getAllFiles(filePath, basePath, arrayOfFiles);
  } else {
   arrayOfFiles.push(path.relative(basePath, filePath));
  }
 });
 return arrayOfFiles;
}

// Format file name and location
function formatNameAndLocation(fileName, directoryPath) {
 const formattedName = fileName
  .replace(/-/g, ' ')
  .split(' ')
  .map((word) => {
   const lowerCaseWord = word.toLowerCase();
   return (
    WORD_REPLACEMENTS[lowerCaseWord] ||
    word.charAt(0).toUpperCase() + word.slice(1)
   );
  })
  .join(' ');

 if (directoryPath === '.') {
  return { formattedName, formattedLocation: '/' };
 }

 const formattedLocation = directoryPath
  .split(path.sep)
  .filter((part) => part)
  .map((part) =>
   part
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => {
     const lowerCaseWord = word.toLowerCase();
     return (
      WORD_REPLACEMENTS[lowerCaseWord] ||
      word.charAt(0).toUpperCase() + word.slice(1)
     );
    })
    .join(' ')
  )
  .join(' - ');

 return { formattedName, formattedLocation };
}

// Main function to process files
function processFiles() {
 const files = getAllFiles(DOCS_DIRECTORY, DOCS_DIRECTORY);
 const lastUpdatedDates = files
  .map((relativeFilePath) => {
   const fullPath = path.join(DOCS_DIRECTORY, relativeFilePath);
   const fileNameWithoutExtension = path.basename(
    relativeFilePath,
    path.extname(relativeFilePath)
   );
   if (EXCLUDE_FILES.includes(fileNameWithoutExtension.toLowerCase())) {
    return null;
   }
   const lastUpdatedISO = getGitLastUpdated(fullPath).toISOString();
   const { formattedName, formattedLocation } = formatNameAndLocation(
    fileNameWithoutExtension,
    path.dirname(relativeFilePath)
   );

   return {
    name: formattedName,
    url: relativeFilePath.replace(/\\/g, '/').replace(/\.mdx$/, ''),
    location: formattedLocation,
    lastUpdated: lastUpdatedISO.split('T')[0],
   };
  })
  .filter(Boolean);

 lastUpdatedDates.sort(
  (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
 );
 writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(lastUpdatedDates));
 console.log('Updated last-updated.json with latest timestamps.');
}

processFiles();
