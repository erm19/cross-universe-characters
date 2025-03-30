import { Character } from "../models";

export abstract class CharacterSource {
  /**
   * Fetch raw data from the API.
   * @param limit - The maximum number of items to fetch.
   * @returns The fetched data.
   */
  abstract fetchData(limit?: number): Promise<any>;

  /**
   * Normalize raw data into the standard structure.
   * @param rawData - The raw data to normalize.
   * @returns The normalized Character object.
   */
  abstract normalizeData(rawData: any): Character;

  /**
   * Fetch paginated data from the API.
   * @param endpoint - The endpoint to fetch data from.
   * @param maxPages - The maximum number of pages to fetch.
   * @param getTotalPages - A function to extract the total number of pages from the API response.
   * @returns The fetched data.
   */
  protected async fetchPaginatedData(
    endpoint: string,
    maxPages: number,
    getTotalPages: (data: any) => number
  ): Promise<any[]> {
    const initialResponse = await fetch(endpoint);
    const initialData = await initialResponse.json();
    const totalPages = getTotalPages(initialData);

    const pagesToFetch = Math.min(totalPages, maxPages);
    const pagePromises = [];

    for (let page = 2; page <= pagesToFetch; page++) {
      pagePromises.push(fetch(`${endpoint}?page=${page}`));
    }

    const pageResponses = await Promise.all(pagePromises);
    const allData = [initialData, ...(await Promise.all(pageResponses.map((response) => response.json())))].flatMap(
      (data) => data.results
    );

    return allData;
  }
}
