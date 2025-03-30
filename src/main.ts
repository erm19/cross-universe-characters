import { CharacterSourceFactory } from "./factory/CharacterSourceFactory";
import { PokemonClient, StarWarsClient, RickAndMortyClient } from "./api";

async function main() {
  const pokemonClient = CharacterSourceFactory.createSource("pokemon");
  const starWarsClient = CharacterSourceFactory.createSource("starwars");
  const rickAndMortyClient = CharacterSourceFactory.createSource("rickandmorty");
}

main();
