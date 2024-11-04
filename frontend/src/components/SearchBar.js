import React from 'react';

const SearchBar = ({ query, onQueryChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Search..."
        style={{ width: 'calc(100% - 22px)', padding: '10px' }}
      />
      <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;