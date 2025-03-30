import { PokemonSource } from "./api";

async function main() {
  const pokemonSource = new PokemonSource();
  const pokemon = await pokemonSource.fetchData();
  const normalizedPokemon = pokemon.map((p: any) => pokemonSource.normalizeData(p));
  console.log(normalizedPokemon);
}

main();
