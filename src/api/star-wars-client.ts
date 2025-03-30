import { Character } from "../models/character";
import { CharacterSource } from "./character-source";
import { config } from "../config/config";

export class StarWarsClient extends CharacterSource {
  async fetchData(): Promise<any> {
    const requests = Array(9)
      .fill(0)
      .map((_, i) => fetch(config.swapi.endpoint + "people/?page=" + (i + 1)));

    const responses = await Promise.all(requests);
    const jsonResponses = await Promise.all(responses.map((response) => response.json()));

    const data: { results: any[] } = {
      results: [],
    };
    for (const jsonResponse of jsonResponses) {
      data.results.push(...jsonResponse.results);
    }

    for (const character of data.results) {
      if (character.species.length) {
        const speciesPromises = character.species.map((url: string) => fetch(url).then((res) => res.json()));
        const speciesData = await Promise.all(speciesPromises);
        character.species = speciesData.map((species) => species.name);
      }
    }

    return data.results;
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
