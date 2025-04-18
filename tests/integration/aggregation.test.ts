import { CharacterSourceFactory } from "../../src/factory/CharacterSourceFactory";
import { Character } from "../../src/models";

jest.mock("../../src/core/config", () => ({
  config: {
    pokeAPI: {
      endpoint: "https://pokeapi.co/api/v2/",
    },
    swapi: {
      endpoint: "https://swapi.dev/api/",
    },
    rickAndMortyAPI: {
      endpoint: "https://rickandmortyapi.com/api/",
    },
  },
}));

describe("Data Aggregation and Sorting", () => {
  it("should aggregate and sort data from all sources", async () => {
    const pokemonClient = CharacterSourceFactory.createSource("pokemon");
    const starWarsClient = CharacterSourceFactory.createSource("starwars");
    const rickAndMortyClient = CharacterSourceFactory.createSource("rickandmorty");

    const [pokemonData, starWarsData, rickAndMortyData] = await Promise.all([
      pokemonClient.fetchData(10).then((data) => data.map(pokemonClient.normalizeData)),
      starWarsClient.fetchData(1).then((data) => data.map(starWarsClient.normalizeData)),
      rickAndMortyClient.fetchData(1).then((data) => data.map(rickAndMortyClient.normalizeData)),
    ]);

    const aggregatedData: Character[] = [...pokemonData, ...starWarsData, ...rickAndMortyData];
    aggregatedData.sort((a, b) => a.name.localeCompare(b.name));

    expect(aggregatedData).toBeDefined();
    expect(Array.isArray(aggregatedData)).toBe(true);
    expect(aggregatedData.length).toBeGreaterThan(0);
    expect(aggregatedData[0].name).toBeDefined();
  }, 20000);
});
