import { Character } from "../models";
import { CharacterSource } from "./character-source";
import { config } from "../core/config";

export class StarWarsClient extends CharacterSource {
  async fetchData(maxPages: number = 9): Promise<any> {
    try {
      const allCharacters = await this.fetchPaginatedData(
        config.swapi.endpoint + "people",
        maxPages,
        () => maxPages // SWAPI uses a fixed number of pages
      );

      // Fetch species data for each character
      for (const character of allCharacters) {
        if (character.species.length) {
          try {
            const speciesPromises = character.species.map((url: string) => fetch(url).then((res) => res.json()));
            const speciesData = await Promise.all(speciesPromises);
            character.species = speciesData.map((species) => species.name);
          } catch (error) {
            console.error(`Error fetching species for ${character.name}:`, error);
          }
        }
      }

      return allCharacters;
    } catch (error) {
      console.error("Error fetching Star Wars data:", error);
    }
  }

  normalizeData(rawData: any): Character {
    return {
      name: rawData.name,
      origin: "Star Wars",
      species: rawData.species.join(", "),
      additional_attribute: rawData.birth_year,
    };
  }
}
