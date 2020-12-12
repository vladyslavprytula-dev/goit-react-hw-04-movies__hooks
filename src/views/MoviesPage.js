import React, { useState, useEffect, useRef } from 'react';
import Error from '../Components/Error/Error';
import Loader from '../Components/Loader/Loader';
import Button from '../Components/LoadMoreBtn/Button';
import MoviesList from '../Components/MoviesList/MoviesList';
import { fetchMoviesPage } from '../services/fetchFilms';
import '../styles/search.scss';

export default function MoviesPage(props) {
  const [inputValue, setInputValue] = useState('');
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getFilm = localStorage.getItem('film');
    if (getFilm) {
      setSearchMovie(getFilm);
    }
  }, []);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchMovies(currentPage, searchMovie);
    localStorage.setItem('film', searchMovie);
  }, [searchMovie]);

  const onChangeValue = value => {
    setSearchMovie(value);
  };
  const fetchMovies = () => {
    const options = {
      currentPage,
      searchMovie,
    };
    setIsLoading(true);
    fetchMoviesPage(options)
      .then(results => {
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        setFilms(prevFilms => [...prevFilms, ...results]);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handelInputChange = e => {
    const { value } = e.currentTarget;
    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onChangeValue(inputValue);
    if (inputValue !== searchMovie) {
      reset();
    }
  };

  const reset = () => {
    setInputValue('');
    setCurrentPage(1);
    setFilms([]);
  };

  const shouldRenderLoadMoreBtn = films.length > 0 && !isLoading;
  return (
    <>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={inputValue}
          onChange={handelInputChange}
          className="SearchForm__input"
        />
        <button type="submit" className="SearchForm__button">
          <span className="SearchForm__button--label">Search</span>
        </button>
      </form>

      {error ? (
        <Error text={error} />
      ) : (
        <>
          <MoviesList films={films} />
          {shouldRenderLoadMoreBtn && <Button onClick={fetchMovies} />}
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
}
