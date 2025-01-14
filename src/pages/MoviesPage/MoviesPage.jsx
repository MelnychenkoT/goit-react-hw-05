import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList'; 
import s from "./MoviesPage.module.css";
import Loader from '../../components/Loader/Loader';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useSearchParams();  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const searchQuery = query.get('query') || '';
  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      const url = `https://api.themoviedb.org/3/search/movie?api_key=af069d5a4aa6dab18750675f951f88b6&query=${searchQuery}&language=en-US`;

      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setQuery({ query: event.target.value });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input className={s.searchInput}
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading && < Loader />}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;