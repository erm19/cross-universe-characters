import { Character } from "./models";
import { CharacterSourceFactory } from "./factory/CharacterSourceFactory";
import { writeToFile } from "./utils/file-writer";

async function main() {
  const pokemonClient = CharacterSourceFactory.createSource("pokemon");
  const starWarsClient = CharacterSourceFactory.createSource("starwars");
  const rickAndMortyClient = CharacterSourceFactory.createSource("rickandmorty");

  const [pokemonData, starWarsData, rickAndMortyData] = await Promise.all([
    pokemonClient.fetchData().then((data) => data.map(pokemonClient.normalizeData)),
    starWarsClient.fetchData().then((data) => data.map(starWarsClient.normalizeData)),
    rickAndMortyClient.fetchData().then((data) => data.map(rickAndMortyClient.normalizeData)),
  ]);

  const aggregatedData: Character[] = [...pokemonData, ...starWarsData, ...rickAndMortyData];

  aggregatedData.sort((a, b) => a.name.localeCompare(b.name));

  const jsonData = JSON.stringify(aggregatedData, null, 2);

  await writeToFile(jsonData, "data/characters.json");
}

main();
