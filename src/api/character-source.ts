import { Character } from "../models";

export abstract class CharacterSource {
  // Method to retrieve raw data from the API
  abstract fetchData(): Promise<any>;

  // Method to transform raw data into the standard structure
  abstract normalizeData(rawData: any): Character;
}
