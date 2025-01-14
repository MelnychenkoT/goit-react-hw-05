import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import axios from 'axios';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('day');

 
  const fetchTrendingMovies = async (timeframe) => {
    const url = `https://api.themoviedb.org/3/trending/movie/${timeframe}?api_key=af069d5a4aa6dab18750675f951f88b6&language=en-US&page=1`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  
  useEffect(() => {
    fetchTrendingMovies(category);
  }, [category]);

  return (
    <div>
      <h1 className={s.home_title}>Trending Movies</h1>
      <div>
        <button className={s.btn} onClick={() => setCategory('day')}>Trending Today</button>
        <button className={s.btn}onClick={() => setCategory('week')}>Trending This Week</button>
      </div>
      <MovieList movies={movies} />
    </div> 
  );
};

export default HomePage;