import { Character } from "../models";
import { CharacterSource } from "./character-source";
import { config } from "../core/config";

export class PokemonClient extends CharacterSource {
  async fetchData(limit: number = 100000, offset: number = 0): Promise<any> {
    const pokemonList = await (
      await fetch(config.pokeAPI.endpoint + `pokemon/?limit=${limit}&offset=${offset}`)
    ).json();

    // When trying to fetch all data we get rejected by the server
    // so we ocess in batches of 200 with 20ms delay between batches
    const batchSize = 200;
    const delay = 20;
    const pokemonDetails = [];

    for (let i = 0; i < pokemonList.results.length; i += batchSize) {
      const batch = pokemonList.results.slice(i, i + batchSize);
      const batchPromises = batch.map(async (pokemon: { name: string; url: string }) => await fetch(pokemon.url));

      const batchResponses = await Promise.all(batchPromises);
      pokemonDetails.push(...(await Promise.all(batchResponses.map((response: any) => response.json()))));

      if (i + batchSize < pokemonList.results.length) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    return pokemonDetails;
  }
  normalizeData(rawData: any): Character {
    const types: string[] = [];
    if (!Array.isArray(rawData.types)) {
      const pokeType = rawData.types?.type?.name || "";
      types.push(pokeType.charAt(0).toUpperCase() + pokeType.slice(1));
    } else {
      types.push(...rawData.types.map((t: any) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)));
    }

    return {
      name: rawData.name,
      origin: "Pokémon",
      species: types.join("/"),
      additional_attribute: rawData.base_experience,
    };
  }
}
