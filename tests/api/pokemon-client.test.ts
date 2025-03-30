import { PokemonClient } from "../../src/api/pokemon-client";
import { Character } from "../../src/models";

jest.mock("../../src/core/config", () => ({
  config: { pokeAPI: { endpoint: "https://pokeapi.co/api/v2/" } },
}));

describe("PokemonClient", () => {
  let client: PokemonClient;

  beforeEach(() => {
    client = new PokemonClient();
  });

  it("should fetch data successfully", async () => {
    const data = await client.fetchData(10, 0);
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should normalize data correctly", () => {
    const rawData = { name: "pikachu", types: [{ type: { name: "electric" } }], base_experience: 112 };

    const character: Character = client.normalizeData(rawData);

    expect(character).toEqual({ name: "pikachu", origin: "Pokémon", species: "Electric", additional_attribute: 112 });
  });
});
