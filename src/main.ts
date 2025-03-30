import { PokemonSource, StarWarsSource, RickAndMortyClient } from "./api";

async function main() {
  //   const pokemonSource = new PokemonSource();
  //   const pokemon = await pokemonSource.fetchData();
  //   const normalizedPokemon = pokemon.map((p: any) => pokemonSource.normalizeData(p));
  //   console.log(normalizedPokemon);

  // const starWarsSource = new StarWarsSource();
  // const starWars = await starWarsSource.fetchData();
  // const normalizedStarWars = starWars.map((s: any) => starWarsSource.normalizeData(s));
  // console.log(normalizedStarWars);

  const rickAndMortyClient = new RickAndMortyClient();
  const rickAndMorty = await rickAndMortyClient.fetchData();
  const normalizedRickAndMorty = rickAndMorty.map((r: any) => rickAndMortyClient.normalizeData(r));
  console.log(normalizedRickAndMorty);
}

main();
