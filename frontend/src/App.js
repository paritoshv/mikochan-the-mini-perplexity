import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3002/api/v1/search?prompt=${query}`);
      setResults(response.data.summarizedResults);
    } catch (err) {
      setError('Failed to fetch results');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) fetchResults();
  };

  return (
    <div className="app">
      <header style={{ padding: '20px', textAlign: 'center', background: '#282c34', color: 'white' }}>
        <h1>MikoChan.ai <br/> (Perplexity Mini)</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <SearchBar
          query={query}
          onQueryChange={(e) => setQuery(e.target.value)}
          onSubmit={handleSubmit}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SearchResult results={results} />
        )}
      </main>
    </div>
  );
}

export default App;