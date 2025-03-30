import { Character } from "../models";
import { CharacterSource } from "./character-source";
import { config } from "../core/config";

export class PokemonClient extends CharacterSource {
  /**
   * Fetch Pokémon data from the API.
   * @param limit - The maximum number of items to fetch.
   * @param offset - The offset to start fetching from.
   * @returns The fetched Pokémon data.
   */
  async fetchData(limit: number = 100000, offset: number = 0): Promise<any> {
    try {
      const endpoint = `${config.pokeAPI.endpoint}pokemon/?limit=${limit}&offset=${offset}`;
      const allPokemon = await this.fetchPaginatedData(endpoint, limit, (data) => Math.ceil(data.count / limit));

      // When trying to fetch all data we get rejected by the server
      // so we ocess in batches of 200 with 20ms delay between batches
      const batchSize = 200;
      const delay = 20;
      const pokemonDetails = [];

      for (let i = 0; i < allPokemon.length; i += batchSize) {
        const batch = allPokemon.slice(i, i + batchSize);
        const batchPromises = batch.map(async (pokemon: { name: string; url: string }) => {
          try {
            const response = await fetch(pokemon.url);
            return await response.json();
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null;
          }
        });

        // Waiting for all batch promises to resolve
        const batchResponses = await Promise.all(batchPromises);
        pokemonDetails.push(...batchResponses.filter((detail) => detail !== null));

        if (i + batchSize < allPokemon.length) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      return pokemonDetails;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return [];
    }
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
