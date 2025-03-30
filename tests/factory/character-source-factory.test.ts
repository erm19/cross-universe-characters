import { CharacterSourceFactory } from "../../src/factory/CharacterSourceFactory";
import { PokemonClient, StarWarsClient, RickAndMortyClient } from "../../src/api";
import { Source } from "../../src/core/types";

describe("CharacterSourceFactory", () => {
  it("should create a PokemonClient instance", () => {
    const client = CharacterSourceFactory.createSource("pokemon" as Source);
    expect(client).toBeInstanceOf(PokemonClient);
  });

  it("should create a StarWarsClient instance", () => {
    const client = CharacterSourceFactory.createSource("starwars" as Source);
    expect(client).toBeInstanceOf(StarWarsClient);
  });

  it("should create a RickAndMortyClient instance", () => {
    const client = CharacterSourceFactory.createSource("rickandmorty" as Source);
    expect(client).toBeInstanceOf(RickAndMortyClient);
  });

  it("should throw an error for an unknown source type", () => {
    expect(() => CharacterSourceFactory.createSource("unknown" as Source)).toThrow("Unknown source type: unknown");
  });
});
