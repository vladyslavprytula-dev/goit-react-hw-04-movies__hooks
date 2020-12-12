import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import MovieBackButton from '../Components/MovieBackButton/MovieBackButton';
import MovieDetails from '../Components/MovieDetails/MovieDetails';
import MovieNav from '../Components/MovieNav/MovieNav';
import Cast from './Cast';
import Reviews from './Reviews';
import Loader from '../Components/Loader/Loader';
import Error from '../Components/Error/Error';
import routes from '../routes';
import { fetchMovieDetails } from '../services/fetchFilms';

export default function HomePage(props) {
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails(props.match.params.movieId)
      .then(hit => {
        setFilm(hit);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [props.match.params.movieId]);
  const handleGoBack = () => {
    const { location, history } = props;
    history.push(location.state.from || routes.home);
  };
  const { match } = props;
  return (
    <>
      {isLoading && <Loader />}
      {error && <Error text={error} />}
      {film ? (
        <>
          <MovieBackButton handleGoBack={handleGoBack} />
          <MovieDetails {...film} />
          <MovieNav filmId={film.id} />
          <Route path={`${match.path}/cast`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </>
      ) : (
        ''
      )}
    </>
  );
}
