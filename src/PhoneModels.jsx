
// src/PhoneModels.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhoneModels = () => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [filters, setFilters] = useState({ brand: '', priceRange: '', features: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://api.example.com/phones')
      .then(response => {
        setPhones(response.data);
        setFilteredPhones(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterPhones();
  }, [filters, currentPage]);

  const filterPhones = () => {
    let filtered = phones;

    if (filters.brand) {
      filtered = filtered.filter(phone => phone.brand === filters.brand);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(phone => phone.price >= min && phone.price <= max);
    }

    if (filters.features) {
      filtered = filtered.filter(phone => phone.features.includes(filters.features));
    }

    setFilteredPhones(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = filteredPhones.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Phone Models</h1>

      <div>
        <label>
          Brand:
          <select onChange={(e) => setFilters({ ...filters, brand: e.target.value })}>
            <option value="">All</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Huawei">Huawei</option>
          </select>
        </label>

        <label>
          Price Range:
          <select onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}>
            <option value="">All</option>
            <option value="0-500">0-500</option>
            <option value="500-1000">500-1000</option>
            <option value="1000-1500">1000-1500</option>
          </select>
        </label>

        <label>
          Features:
          <select onChange={(e) => setFilters({ ...filters, features: e.target.value })}>
            <option value="">All</option>
            <option value="5G">5G</option>
            <option value="Wireless Charging">Wireless Charging</option>
            <option value="Waterproof">Waterproof</option>
          </select>
        </label>
      </div>

      <div className="phone-grid">
        {currentPhones.map(phone => (
          <div key={phone.id} className="phone-card">
            <h2>{phone.model}</h2>
            <p>Brand: {phone.brand}</p>
            <p>Price: ${phone.price}</p>
            <p>Features: {phone.features.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {[...Array(Math.ceil(filteredPhones.length / itemsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhoneModels;
