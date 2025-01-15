import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast, fetchPosters } from "../../services/api";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCasts = async () => {
      try {
        setLoading(true);
        const [posterBaseUrl, castData] = await Promise.all([
          fetchPosters(),
          fetchCast(movieId),
        ]);
        setBaseUrl(posterBaseUrl);
        setCasts(castData);
      } catch {
        setError("Failed to fetch movie cast");
      } finally {
        setLoading(false);
      }
    };
    getCasts();
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!casts || casts.length === 0) {
    return <div>No cast info found for this movie.</div>;
  }

  return (
    <div className={s.cast_section}>
      
      {casts.length ? (
        <div className={s.cast_list}>
          {casts.map((actor) => (
            <div key={actor.id} className={s.actor_card}>
               {casts.profile_path ? (
                <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className={s.actor_image}
                />
              ) : (
                <p className={s.no_image}>No image available</p>
              )}
              <div className={s.actor_info}>
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cast information available</p>
      )}
    </div>
  );
};

export default MovieCast;