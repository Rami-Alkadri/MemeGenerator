import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.join(__dirname, "enwiki-20250221-all-media-titles.txt"), "utf8");
console.log("Data loaded from enwiki-20250221-all-media-titles.txt");

const lines = data.split("\n").filter(Boolean);
const filteredTitles = lines
  .map(line => line.replace(/_/g, " ").replace(/\.[a-zA-Z]+$/, "").replace(/\s*\([^)]*\)$/, ""))
  .filter(title => title.split(" ").length <= 4);

fs.writeFileSync(
  path.join(__dirname, "../../public/wikiTitles.json"),
  JSON.stringify(filteredTitles, null, 2)
);

console.log("Filtered wiki titles written to public/wikiTitles.json");
