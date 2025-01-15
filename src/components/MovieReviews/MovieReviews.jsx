import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from "../../services/api.js";
import s from './MovieReviews.module.css'

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div className={s.reviews_section}>
     
      {reviews.length ? (
        <ul>
          {reviews.map((review) => (
            <li className={s.review_item} key={review.id}>
              <h3 className={s.reviews_author}>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default MovieReviews;