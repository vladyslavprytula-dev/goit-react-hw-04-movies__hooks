import React, { useState, useEffect } from 'react';
import Error from '../Components/Error/Error';
import MoviesList from '../Components/MoviesList/MoviesList';
import Loader from '../Components/Loader/Loader';
import { fetchTrendingFilms } from '../services/fetchFilms';
export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    localStorage.removeItem('film');
    setIsLoading(true);
    fetchTrendingFilms()
      .then(hits => {
        setFilms(hits);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {error ? (
        <Error text={error} />
      ) : (
        <>
          <MoviesList films={films} />
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
}
