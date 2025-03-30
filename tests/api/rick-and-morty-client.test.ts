import { RickAndMortyClient } from "../../src/api";
import { Character } from "../../src/models";

jest.mock("../../src/core/config", () => ({
  config: { rickAndMortyAPI: { endpoint: "https://rickandmortyapi.com/api/" } },
}));

describe("RickAndMortyClient", () => {
  let client: RickAndMortyClient;

  beforeEach(() => {
    client = new RickAndMortyClient();
  });

  it("should fetch data successfully", async () => {
    const data = await client.fetchData(1);
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should normalize data correctly", () => {
    const rawData = {
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
      },
    };
    const character: Character = client.normalizeData(rawData);
    expect(character).toEqual({
      name: "Rick Sanchez",
      origin: "Rick and Morty",
      species: "Human",
      additional_attribute: "Alive",
    });
  });
});
