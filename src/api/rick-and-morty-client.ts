import { Character } from "../models/character";
import { CharacterSource } from "./character-source";
import { config } from "../config/config";

export class RickAndMortyClient extends CharacterSource {
  async fetchData(): Promise<any> {
    const initialResponse = fetch(config.rickAndMortyAPI.endpoint + "character");
    const initialData = await (await initialResponse).json();
    const totalPages = initialData.info.pages;

    // Create an array of promises for each page
    const pagePromises = [];
    for (let page = 2; page <= totalPages; page++) {
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
