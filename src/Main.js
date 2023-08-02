import { useState, useEffect } from "react";

function Main({ movies }) {
  const [displayMovies, setDisplayMovies] = useState([]);

  // Use useEffect to update displayMovies when the movies prop changes
  useEffect(() => {
    setDisplayMovies(movies);
  }, [movies]);
  return (
    <main>
      <FilterBox
        movies={movies}
        setDisplayMovies={setDisplayMovies}
      ></FilterBox>
      <div className="movie-grid">
        {displayMovies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export default Main;

function FilterBox({ movies, setDisplayMovies }) {
  const [filterItem, setFilterItem] = useState("");
  const startYear = 2000;
  const endYear = 2023;
  const years = [];

  for (let year = startYear; year <= endYear; year++) years.push(String(year));

  const handleChange = (e) => {
    const selectedYear = e.target.value;
    console.log(selectedYear);
    setFilterItem(selectedYear);
    if (selectedYear === "NO") setDisplayMovies(movies);
    else {
      setDisplayMovies(() => {
        const filteredMovies = movies?.filter((pm) => {
          return pm.Year === selectedYear;
        });
        return filteredMovies;
      });
    }
  };

  return (
    <div className="filter">
      <select value={filterItem} onChange={handleChange}>
        <option key={0} value={"NO"}>
          No Filter
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

const Movie = ({ movie }) => {
  const { Title, Year, Poster } = movie;
  return (
    <div className="movie-card">
      <img src={Poster} alt={Title} />
      <div>
        <h2>{Title}</h2>
        <p>{Year}</p>
      </div>
    </div>
  );
};
