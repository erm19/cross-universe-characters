import { Character } from "../models";
import { CharacterSource } from "./character-source";
import { config } from "../core/config";

export class RickAndMortyClient extends CharacterSource {
  async fetchData(maxPages: number = 100000): Promise<any> {
    const initialResponse = fetch(config.rickAndMortyAPI.endpoint + "character");
    const initialData = await (await initialResponse).json();
    const totalPages = initialData.info.pages;

    const pagesToFetch = Math.min(totalPages, maxPages);

    // Create an array of promises for each page
    const pagePromises = [];
    for (let page = 2; page <= pagesToFetch; page++) {
      pagePromises.push(fetch(config.rickAndMortyAPI.endpoint + `character?page=${page}`));
    }

    // Wait for all page requests to resolve
    const pageResponses = await Promise.all(pagePromises);
    const characterDetails = [initialData, ...(await Promise.all(pageResponses.map((response) => response.json())))];

    // Flatten the results
    const allCharacters = characterDetails.flatMap((data) => data.results);

    return allCharacters;
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
