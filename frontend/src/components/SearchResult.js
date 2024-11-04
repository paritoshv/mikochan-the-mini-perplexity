import React from 'react';

const SearchResult = ({ results }) => {
  if (!results) return null;

  return (
    <div>
      <h2>Overall Summary</h2>
      <p>{results.overallSummary}</p>
      <h2>Detailed Summaries</h2>
      {results.detailedSummaries.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>{item.title}</h3>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;