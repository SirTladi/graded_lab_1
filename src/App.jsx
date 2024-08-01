// src/App.js
import React from 'react';
import CharactersComponent from './CharactersComponent';
import PhoneModels from './PhoneModels';
import './App.css';

const App = () => {
  return (
    <div>
      <CharactersComponent />
      <PhoneModels />
    </div>
  );
};

export default App;
