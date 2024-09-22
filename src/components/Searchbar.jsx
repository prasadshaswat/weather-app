import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState('');
  
  // Function to handle search
  const handleSearch = () => {
    if (input.trim() !== '') {
      setCity(input);
      setInput('');
    }
  };

  // Function to handle 'Enter' key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center mb-6 p-4">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter City"
          className="w-full p-4 pr-12 rounded-lg shadow-md focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
          style={{
            background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
          }}
          aria-label="City search input"
        />
        <FaSearch className="absolute right-4 top-4 text-gray-500" />
      </div>
      <button
        onClick={handleSearch}
        className="p-3 ml-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          background: 'linear-gradient(135deg, #4fc3f7, #0288d1)',
        }}
        aria-label="Search button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
