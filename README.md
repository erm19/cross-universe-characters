<p align="center">
  <img src="assets/Shift_Security_logo.gif" width="150" alt="Shift Security Logo">
</p>

# 🌌 Cross-Universe Characters

## 🚀 Overview

This project synchronizes and aggregates character data from multiple fictional universes:

- **Pokémon** (via [PokéAPI](https://pokeapi.co))
- **Star Wars** (via [SWAPI](https://swapi.py4e.com))
- **Rick and Morty** (via [Rick and Morty API](https://rickandmortyapi.com))

The app fetches character data, normalizes it into a shared structure, stores it locally (simulating a database), and outputs an aggregated, sorted JSON list.

## 🧠 Why This Exists

Imagine needing to compare characters across universes — their origins, species, and unique traits — in one unified place. This app does exactly that while being **future-proof**, **modular**, and **easy to extend** for new sources or features.

---

## 🧱 Architecture

The project follows a modular, object-oriented design using the **Factory Pattern** and **interface segregation** principles.

```
src/
│
├── clients/             # Source-specific API clients
│   ├── PokemonClient.ts
│   ├── StarWarsClient.ts
│   └── RickAndMortyClient.ts
│
├── models/              # Shared data interfaces and types
│   └── Character.ts
│
├── factory/             # Factory for selecting the right data client
│   └── CharacterSourceFactory.ts
│
├── utils/               # File writing.
│
└── index.ts             # Entrypoint: orchestration layer
```

### 🏗️ Architecture Diagram (Factory Pattern)

```plaintext
                   +----------------------------+
                   |    CharacterSourceFactory  |
                   +------------+---------------+
                                |
        +-----------------------+----------------------+
        |                      |                      |
+---------------+     +----------------+     +-------------------+
| PokemonClient |     | StarWarsClient |     | RickAndMortyClient|
+---------------+     +----------------+     +-------------------+
        \____________________    ____________________/
                             \  /
                        +------------+
                        | Character  |
                        |  (Model)   |
                        +------------+
```

> 📌 **Design Highlight:** All new universes can be integrated by simply adding a new client and registering it in the factory — no rewrites required.

---

## 🛠️ Setup Instructions

### 🐳 Using Docker

- Build the Image

  ```bash
  docker build -t <tag-of-your-choice or none> .
  ```

- Run the Image

  ```bash
  docker run <tag-of-your-choice or image id>
  ```

### Locally

- Install Dependencies

  ```bash
  npm install
  ```

- Run the App

  ```bash
  npm start
  ```

This will:

- Fetch all characters from the three APIs
- Normalize and store them in `characters.json`
- Sort them alphabetically by name
- Print the result in the terminal

### 3. Run Tests

```bash
npm test
```

---

## 📦 Sample Output

```json
[
  {
    "name": "Bulbasaur",
    "origin": "Pokémon",
    "species": "Grass/Poison",
    "additional_attribute": 64
  },
  {
    "name": "Luke Skywalker",
    "origin": "Star Wars",
    "species": "Human",
    "additional_attribute": "19BBY"
  },
  {
    "name": "Rick Sanchez",
    "origin": "Rick and Morty",
    "species": "Human",
    "additional_attribute": "Alive"
  }
]
```

---

## 🧩 Extending the System

### ➕ Adding a New Data Source

1. Create a new class implementing the `CharacterSource` interface
2. Implement `fetchData()` and `normalizeData()`
3. Register the class in `CharacterSourceFactory`
4. Add related unit tests

### ✨ Adding a New Attribute

1. Update the `Character` interface
2. Update each client’s `normalizeData()` method to include the new attribute
3. Add relevant tests

---

## 🧪 Testing Strategy

- **Unit tests** for each client to validate normalization logic
- **Mocked API responses** to avoid reliance on external endpoints
- **Edge cases**: Empty responses, missing attributes, malformed data

> ✅ Goal: Maintain reliability and testability even as the system grows

---

## 🧱 Assumptions Made

- All characters have a `name`, `species`, and a universe-specific `additional_attribute`
- Local file (`characters.json`) simulates persistent storage
- No need to implement rate limiting handling for this scope

---

## 🌱 Future Enhancements

- Add CLI filtering (e.g., by origin, species)
- Integrate caching (e.g., using Redis)
- Dockerize for seamless deployment
- Add a simple web UI to browse the characters

---

## 🧑‍💻 Contributing

Feel free to fork the repo and submit PRs. For major features or refactors, open an issue first to discuss your proposal.

---

## 🙌 Final Notes

This app is designed with **scalability and maintainability in mind**, following clean code principles and anticipating future growth. Adding a new universe should never require breaking the existing code — just plug and play.
