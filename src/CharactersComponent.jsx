// src/CharactersComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterDetails from './CharacterDetails';

const CharactersComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ gender: '', alive: '', species: '' });
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    axios.get('https://hp-api.onrender.com/api/characters')
      .then(response => {
        setCharacters(response.data);
        setFilteredCharacters(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [search, filters]);

  const filterCharacters = () => {
    let filtered = characters;

    if (search) {
      filtered = filtered.filter(character => character.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (filters.gender) {
      filtered = filtered.filter(character => character.gender === filters.gender);
    }

    if (filters.alive) {
      filtered = filtered.filter(character => character.alive === (filters.alive === 'alive'));
    }

    if (filters.species) {
      filtered = filtered.filter(character => character.species === filters.species);
    }

    setFilteredCharacters(filtered);
  };

  return (
    <div>
      {selectedCharacter ? (
        <CharacterDetails character={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      ) : (
        <div>
          <h1>Harry Potter Characters</h1>
          <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />

          <div>
            <label>
              Gender:
              <select onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <label>
              Alive:
              <select onChange={(e) => setFilters({ ...filters, alive: e.target.value })}>
                <option value="">All</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
              </select>
            </label>

            <label>
              Species:
              <select onChange={(e) => setFilters({ ...filters, species: e.target.value })}>
                <option value="">All</option>
                <option value="human">Human</option>
                <option value="half-giant">Half-Giant</option>
                <option value="werewolf">Werewolf</option>
                <option value="goblin">Goblin</option>
                <option value="house-elf">House Elf</option>
              </select>
            </label>
          </div>

          <ul>
            {filteredCharacters.map(character => (
              <li key={character.name} onClick={() => setSelectedCharacter(character)}>
                {character.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharactersComponent;
