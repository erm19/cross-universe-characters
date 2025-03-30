import { Character } from "models";
import { CharacterSourceFactory } from "./factory/CharacterSourceFactory";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

async function main() {
  const pokemonClient = CharacterSourceFactory.createSource("pokemon");
  const starWarsClient = CharacterSourceFactory.createSource("starwars");
  const rickAndMortyClient = CharacterSourceFactory.createSource("rickandmorty");

  // Fetch and normalize data
  const pokemonData = (await pokemonClient.fetchData()).map(pokemonClient.normalizeData);
  const starWarsData = (await starWarsClient.fetchData()).map(starWarsClient.normalizeData);
  const rickAndMortyData = (await rickAndMortyClient.fetchData()).map(rickAndMortyClient.normalizeData);

  const aggregatedData: Character[] = [...pokemonData, ...starWarsData, ...rickAndMortyData];

  aggregatedData.sort((a, b) => a.name.localeCompare(b.name));

  const jsonData = JSON.stringify(aggregatedData, null, 2);

  try {
    // Ensure the 'data' directory exists
    const dataDir = join(__dirname, "../data");
    await mkdir(dataDir, { recursive: true });

    // Write the JSON data to a local file
    const outputPath = join(dataDir, "output.json");
    await writeFile(outputPath, jsonData, "utf8");
    console.log(`Data written to ${outputPath}`);
  } catch (error) {
    console.error("Error writing data to file:", error);
  }
}

main();
