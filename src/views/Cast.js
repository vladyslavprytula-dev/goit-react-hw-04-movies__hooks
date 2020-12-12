import React, { useState, useEffect } from 'react';
import CastList from '../Components/Cast/CastList';
import Error from '../Components/Error/Error';
import Loader from '../Components/Loader/Loader';
import { fetchCastList } from '../services/fetchFilms';

export default function Cast(props) {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    fetchCastList(props.match.params.movieId)
      .then(({ cast }) => setCasts(cast))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [props.match.params.movieId]);
  return (
    <>
      {isLoading && <Loader />}
      {error && <Error text={error} />}
      {casts && <CastList casts={casts} />}
    </>
  );
}
