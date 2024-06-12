"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination";

import useStore from "../store/store"; // Update the path accordingly

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showCaughtPokemons, setShowCaughtPokemons] = useState(false);

  const ITEMS_PER_PAGE = 20;
  const caughtPokemons = useStore((state) => state.caughtPokemons);
  const addCaughtPokemon = useStore((state) => state.addCaughtPokemon);

  const fetchPokemons = async (page) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`);
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        })
      );
      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found!');
      }
      const data = await response.json();
      setPokemonData([{...data}]); // Wrap the data in an array to maintain consistency with the fetched data structure
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter a Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="button" onClick={handleSearch}>Search</Button>
      </div>
      <Button type="button" onClick={() => setShowCaughtPokemons(!showCaughtPokemons)}>
        {showCaughtPokemons ? "Hide Caught Pokémon" : "Show Caught Pokémon"}
      </Button>
      {showCaughtPokemons && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {caughtPokemons.map((pokemon) => (
            <Card key={pokemon.id} className="w-full max-w-sm">
              <CardHeader>
                <img 
                  src={pokemon.sprites.front_default} 
                  alt={pokemon.name} 
                  style={{ width: '100px', height: '100px' }} // Adjust the width and height as needed
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{pokemon.name}</CardTitle>
                <CardDescription>Type: {pokemon.types.map(type => type.type.name).join(', ')}</CardDescription>
                <CardDescription>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {!showCaughtPokemons && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} className="w-full max-w-sm">
                <CardHeader>
                  <img 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name} 
                    style={{ width: '100px', height: '100px' }} // Adjust the width and height as needed
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{pokemon.name}</CardTitle>
                  <CardDescription>Type: {pokemon.types.map(type => type.type.name).join(', ')}</CardDescription>
                  <CardDescription>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button type="button" onClick={() => addCaughtPokemon(pokemon)}>Caught</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Pagination className="flex justify-center mt-4">
            <PaginationContent>
              <PaginationPrevious onClick={() => setPage(page - 1)} disabled={page === 1} />
              {page > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page - 1)}>{page - 1}</PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
                </PaginationItem>
              )}
              {page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
              <PaginationNext onClick={() => setPage(page + 1)} disabled={page === totalPages} />
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
