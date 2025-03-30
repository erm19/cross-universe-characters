import { Character } from "../models";
import { CharacterSource } from "./character-source";
import { config } from "../core/config";

export class RickAndMortyClient extends CharacterSource {
  async fetchData(maxPages: number = 100000): Promise<any> {
    try {
      const allCharacters = await this.fetchPaginatedData(
        config.rickAndMortyAPI.endpoint + "character",
        maxPages,
        (data) => data.info.pages // Extract total pages from the API response
      );
      return allCharacters;
    } catch (error) {
      console.error("Error fetching Rick and Morty data:", error);
      return [];
    }
  }

  normalizeData(rawData: any): Character {
    return {
      name: rawData.name,
      origin: "Rick and Morty",
      species: rawData.species,
      additional_attribute: rawData.status,
    };
  }
}
