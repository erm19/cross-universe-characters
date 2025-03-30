import { Character } from "../models/character";
import { CharacterSource } from "./character-source";
import { config } from "../config/config";

export class PokemonSource extends CharacterSource {
  async fetchData(limit: number = 100000, offset: number = 0): Promise<any> {
    console.time("fetchData");
    const pokemonList = await (
      await fetch(config.pokeAPI.endpoint + `pokemon/?limit=${limit}&offset=${offset}`)
    ).json();

    // When trying to fetch all data
    // Fetch additional data for each Pokémon concurrently
    // Process in batches of 200 with 20ms delay between batches
    const batchSize = 200;
    const delay = 20;
    const pokemonDetails = [];

    for (let i = 0; i < pokemonList.results.length; i += batchSize) {
      const batch = pokemonList.results.slice(i, i + batchSize);
      const batchPromises = batch.map(async (pokemon: { name: string; url: string }) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      });

      pokemonDetails.push(...(await Promise.all(batchPromises)));

      if (i + batchSize < pokemonList.results.length) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    console.timeEnd("fetchData");

    return pokemonDetails;
  }
  normalizeData(rawData: any): Character {
    const types: string[] = rawData.types.map((t: any) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));

    return {
      name: rawData.name,
      origin: "Pokémon",
      species: types.join("/"),
      additional_attribute: rawData.base_experience,
    };
  }
}
