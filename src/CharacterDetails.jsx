// src/CharacterDetails.js
import React from 'react';

const CharacterDetails = ({ character, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>{character.name}</h2>
      <p>House: {character.house}</p>
      <p>Actor: {character.actor}</p>
      <p>Gender: {character.gender}</p>
      <p>Species: {character.species}</p>
      <p>Alive: {character.alive ? 'Yes' : 'No'}</p>
      <p>Wand: {character.wand ? `${character.wand.wood} wood, ${character.wand.core} core` : 'N/A'}</p>
      <p>Patronus: {character.patronus || 'N/A'}</p>
    </div>
  );
};

export default CharacterDetails;
