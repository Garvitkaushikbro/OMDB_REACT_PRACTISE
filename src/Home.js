import NavBar from "./NavBar";
import Main from "./Main";
import { useState, useEffect } from "react";

const API_KEY = "74986d14";
const OMDB_URL = `http://www.omdbapi.com/?`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(
    function () {
      async function fetchMovies() {
        const URL = OMDB_URL + `s=${query}&page=1&apikey=${API_KEY}`;
        const res = await fetch(URL);
        const data = await res.json();
        const totalResults = parseInt(data.totalResults);
        const resultsPerPage = data.Search ? data.Search.length : 0;

        // Calculate the total number of pages
        const tp =
          resultsPerPage === 0 ? 0 : Math.ceil(totalResults / resultsPerPage);
        if (tp > 1) {
          const URL = OMDB_URL + `s=${query}&page=2&apikey=${API_KEY}`;
          const res = await fetch(URL);
          const data = await res.json();
          const { Search: nextMovie } = data;
          localStorage.setItem("nextMovie", JSON.stringify(nextMovie));
          localStorage.setItem("prevMovie", JSON.stringify({}));
        }
        setTotalPages(tp);
        setCurrentPage(1);
        setMovies(data.Search);
      }
      fetchMovies();
    },
    [query]
  );

  const handleLeftArrow = () => {
    if (currentPage <= 1) return;
    const nextMovie = movies;
    localStorage.setItem("nextMovie", JSON.stringify(nextMovie));
    setMovies(JSON.parse(localStorage.getItem("prevMovie")));

    const URL =
      OMDB_URL + `s=${query}&page=${currentPage - 1}&apikey=${API_KEY}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const { Search: prevMovie } = data;
        localStorage.setItem("prevMovie", JSON.stringify(prevMovie));
      });

    setCurrentPage(currentPage - 1);
  };
  const handleRightArrow = () => {
    if (currentPage >= totalPages) return;
    const prevMovie = movies;
    localStorage.setItem("prevMovie", JSON.stringify(prevMovie));
    setMovies(JSON.parse(localStorage.getItem("nextMovie")));

    const URL =
      OMDB_URL + `s=${query}&page=${currentPage + 1}&apikey=${API_KEY}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const { Search: nextMovie } = data;
        localStorage.setItem("nextMovie", JSON.stringify(nextMovie));
      });

    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <NavBar query={query} setQuery={setQuery} />
      <Main movies={movies} />
      {totalPages && (
        <div className="pagination">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="leftArrow"
            onClick={handleLeftArrow}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <p>{currentPage}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="rightArrow"
            onClick={handleRightArrow}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      )}
    </>
  );
}

export default Home;
