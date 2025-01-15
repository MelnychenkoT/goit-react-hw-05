import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import { fetchMoviesDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state ?? `/movies`);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesDetails(movieId);
        setMovieDetails(data);
      } catch {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  if (!movieDetails) {
    return <div>No movie details found.</div>;
  }

  const {
    title,
    vote_average,
    overview,
    genres,
    posterUrl,
  } = movieDetails;

  return (
    <div className={s.movie_details}>
      <Link to={goBackLink.current}>
        <button className={s.btn} type="button">
          Go back
        </button>
      </Link>

      <div className={s.details_container}>
        <img src={posterUrl} alt={title} className={s.movie_poster}/>
        <div className={s.movie_info}>
          <h1>{title}</h1>
          <p><strong>Rating:</strong> {vote_average} / 10</p>
          <p><strong>Overview:</strong> {overview}</p>
          <p><strong>Genres:</strong> {genres ? genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
        </div>
      </div>

      <div className={s.button_container}>
        <button className={s.btn}>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </button>
        <button className={s.btn}>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </button>
      </div>

      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;