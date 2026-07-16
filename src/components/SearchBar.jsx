import React from 'react'

const SearchBar = ({ query, setQuery }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
