import { Character } from "models";
import { CharacterSourceFactory } from "./factory/CharacterSourceFactory";

async function main() {
  const pokemonClient = CharacterSourceFactory.createSource("pokemon");
  const starWarsClient = CharacterSourceFactory.createSource("starwars");
  const rickAndMortyClient = CharacterSourceFactory.createSource("rickandmorty");

  // Fetch and normalize data
  const pokemonData = (await pokemonClient.fetchData()).map(pokemonClient.normalizeData);
  const starWarsData = (await starWarsClient.fetchData()).map(starWarsClient.normalizeData);
  const rickAndMortyData = (await rickAndMortyClient.fetchData()).map(rickAndMortyClient.normalizeData);

  // Aggregate data into a single list
  const aggregatedData: Character[] = [...pokemonData, ...starWarsData, ...rickAndMortyData];
  console.log(aggregatedData.length);

  // Sort the aggregated data alphabetically by the name field
  aggregatedData.sort((a, b) => a.name.localeCompare(b.name));

  console.log("Sorted Aggregated Data:", aggregatedData);
}

main();
