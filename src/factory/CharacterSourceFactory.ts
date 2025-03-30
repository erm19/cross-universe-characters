import { Source } from "../core/types";
import { PokemonClient, StarWarsClient, RickAndMortyClient, CharacterSource } from "../api";

export class CharacterSourceFactory {
  static createSource(sourceType: Source): CharacterSource {
    switch (sourceType) {
      case "pokemon":
        return new PokemonClient();
      case "starwars":
        return new StarWarsClient();
      case "rickandmorty":
        return new RickAndMortyClient();
      default:
        throw new Error(`Unknown source type: ${sourceType}`);
    }
  }
}
