import { PokemonClient, StarWarsClient, RickAndMortyClient } from "./api";

async function main() {
  //   const pokemonClient = new PokemonClient();
  //   const pokemon = await pokemonClient.fetchData();
  //   const normalizedPokemon = pokemon.map((p: any) => pokemonClient.normalizeData(p));
  //   console.log(normalizedPokemon);

  // const starWarsClient = new StarWarsClient();
  // const starWars = await starWarsClient.fetchData();
  // const normalizedStarWars = starWars.map((s: any) => starWarsClient.normalizeData(s));
  // console.log(normalizedStarWars);

  const rickAndMortyClient = new RickAndMortyClient();
  const rickAndMorty = await rickAndMortyClient.fetchData();
  const normalizedRickAndMorty = rickAndMorty.map((r: any) => rickAndMortyClient.normalizeData(r));
  console.log(normalizedRickAndMorty);
}

main();
