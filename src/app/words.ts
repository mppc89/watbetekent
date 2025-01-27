import path from "path";
import { promises as fs } from "fs";

export async function getWords() {
  try {
    const jsonDirectory = path.join(process.cwd(), "src/app/woorden/data");
    const fileContents = await fs.readFile(
      jsonDirectory + "/words.json",
      "utf8"
    );
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("getWords error:", error);
    return [];
  }
}
