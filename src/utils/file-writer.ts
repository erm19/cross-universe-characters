import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function writeToFile(data: any, filePath: string) {
  try {
    const parts: string[] = filePath.split("/");
    const fileName = parts.pop();
    if (!fileName) throw new Error("File name is required");

    // Ensure the 'data' directory exists
    const rootDir = join(__dirname, "..", "..");
    const dataDir = join(rootDir, ...parts);
    await mkdir(dataDir, { recursive: true });

    // Write the JSON data to a local file
    const outputPath = join(dataDir, fileName);
    await writeFile(outputPath, data, "utf8");
    console.log(data);
  } catch (error) {
    console.error("Error writing data to file:", error);
  }
}
