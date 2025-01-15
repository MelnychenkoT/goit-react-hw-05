import s from "./MovieList.module.css";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


const MovieList = ({ movies }) => {
  const location = useLocation();

  if (movies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <ul className={s.movie_list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;