// src/components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react'; // or use heroicons if preferred

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-10 max-w-3xl mx-auto relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="text-gray-400 w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search jobs by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-6 py-4 rounded-full bg-white/70 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300 text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
