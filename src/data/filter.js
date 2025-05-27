import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, "wikiTitles.json");
const outputPath = path.join(__dirname, "../../public/wikiTitles.filtered.json");

const titles = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const filteredTitles = titles.filter(
  title => !title.trim().toLowerCase().endsWith(" logo")
);

fs.writeFileSync(outputPath, JSON.stringify(filteredTitles, null, 2));

console.log("Filtered titles written to public/wikiTitles.filtered.json");