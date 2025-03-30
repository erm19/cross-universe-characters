# Cross-Universe Characters

## Overview

This project aggregates character data from multiple universes, including Pokémon, Star Wars, and Rick and Morty. It fetches, normalizes, and aggregates data from different APIs into a unified format.

## Architecture

The project uses an object-oriented design with the Factory Pattern to manage API clients. Each API client is responsible for fetching and normalizing data from its respective source.

## Components

- **API Clients**: Classes like `PokemonClient`, `StarWarsClient`, and `RickAndMortyClient` implement the `CharacterSource` interface to fetch and normalize data.
- **Factory**: `CharacterSourceFactory` creates instances of API clients based on the source type.
- **Data Model**: The `Character` interface defines the structure of the aggregated data.

## Extensibility

To add a new data source:

1. Implement a new client class extending `CharacterSource`.
2. Add the new source type to `CharacterSourceFactory`.

To add a new attribute:

1. Update the `Character` interface.
2. Modify the `normalizeData` method in relevant API clients.

## Design Decisions

- **Factory Pattern**: Used to manage the creation of API clients, allowing easy addition of new sources.
- **Interface Segregation**: Each API client implements a common interface, ensuring consistency.

## Future Enhancements

- Add more data sources, such as Marvel Characters API.
- Implement caching to improve performance.
- Enhance error handling and logging.

## Extending the System

### Adding a New Data Source

1. **Create a New Client Class**: Implement a new class that extends `CharacterSource` and implements the `fetchData` and `normalizeData` methods.
2. **Update the Factory**: Add a new case in `CharacterSourceFactory` to handle the new source type and return an instance of the new client class.
3. **Test the New Client**: Write unit tests for the new client's methods to ensure they work as expected.

### Adding a New Attribute

1. **Update the Character Interface**: Add the new attribute to the `Character` interface in `src/models/Character.ts`.
2. **Modify Normalization**: Update the `normalizeData` method in each relevant API client to include the new attribute.
3. **Test the Changes**: Ensure that existing tests pass and add new tests if necessary to cover the new attribute.

### Modifying Existing Features

1. **Identify the Component**: Locate the component or module that needs modification.
2. **Make the Changes**: Implement the necessary changes, ensuring that the code remains consistent with the overall design.
3. **Test Thoroughly**: Run all tests to ensure that the changes do not introduce any regressions.

## Contributing

If you wish to contribute to this project, please follow the guidelines below:

- Fork the repository and create a new branch for your feature or bug fix.
- Write clear, concise commit messages and include tests for any new functionality.
- Submit a pull request with a detailed description of your changes.
