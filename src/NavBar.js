import { useState } from "react";

function NavBar({ query, setQuery }) {
  return (
    <nav>
      <h1>OMDB</h1>
      <SearchBox query={query} setQuery={setQuery}></SearchBox>
      <p>Likes</p>
    </nav>
  );
}

export default NavBar;

function SearchBox({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Enter movie name..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
