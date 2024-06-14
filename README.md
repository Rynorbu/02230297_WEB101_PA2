## Pokémon Catcher App

Welcome to the Pokémon Catcher App! This is a simple web application that allows users to search for Pokémon, view details about them, and keep track of which ones they have caught.

## Features

* Search Pokémon: You can search for Pokémon by name.
* View Pokémon Details: See details about each Pokémon, including their type, abilities, and stats.
* Catch Pokémon: Add Pokémon to your collection.
* Release Pokémon: Remove Pokémon from your collection.
* Pagination: Browse through a list of Pokémon with pagination controls.

### Technologies Used

* React: For building the user interface.
* Zustand: For state management.
* PokéAPI: For fetching Pokémon data.


## Getting Started

### Prerequisites
Node.js (v14 or higher recommended)
npm or yarn


### Install the dependencies:

First clone my repo.

npm install

### Start the development server

npm run dev

Open your browser and go to http://localhost:3000 to see the app in action.

## Usage

### Searching for Pokémon

Enter the name of the Pokémon in the search bar at the top of the page. Click the "Search" button to find the Pokémon.

### Viewing Pokémon Details

After searching, Pokémon details will be displayed including their type, abilities, and stats.

### Catching Pokémon
Click the "Caught" button on the Pokémon card to add it to your collection.

View your collection by clicking the "Show Caught Pokémon" button.

### Releasing Pokémon
In the caught Pokémon view, click the "Release" button on the Pokémon card to remove it from your collection.

### Pagination
Use the pagination controls at the bottom to navigate through different pages of Pokémon.


### Zustand Store

The Zustand store manages the state of caught Pokémon. The state is persisted in localStorage.

### Actions

* addCaughtPokemon(pokemon): Adds a Pokémon to the caught list and updates localStorage.
* removeCaughtPokemon(pokemonId): Removes a Pokémon from the caught list by ID and updates localStorage.
* clearCaughtPokemons(): Clears the caught Pokémon list and removes it from localStorage.
