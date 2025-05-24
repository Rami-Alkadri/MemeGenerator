import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.join(__dirname, "words.txt"), "utf8");
console.log("Data loaded from words.txt");
const wordArray = data.split("\n").filter(Boolean);

fs.writeFileSync(
  path.join(__dirname, "../../public/dictionaryWords.json"),
  JSON.stringify(wordArray, null, 2)
);
