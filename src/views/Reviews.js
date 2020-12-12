import React, { useState, useEffect } from 'react';
import Review from '../Components/Review/Review';
import Loader from '../Components/Loader/Loader';
import NoReview from '../Components/NoReview/NoReview';
import { fetchReviews } from '../services/fetchFilms';
import '../styles/review.scss';
export default function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchReviews(props.match.params.movieId)
      .then(results => setReviews(results))
      .finally(() => setIsLoading(false));
  }, [props.match.params.movieId]);
  return (
    <>
      {isLoading && <Loader />}
      {reviews.length > 0 ? (
        <ul className="Review">
          {reviews.map(review => (
            <li key={review.id} className="Review__item">
              <Review {...review} />
            </li>
          ))}
        </ul>
      ) : (
        <NoReview />
      )}
    </>
  );
}
