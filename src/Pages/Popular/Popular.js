import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList";
import Loader from "../../components/Loader";
import ErrorHandler from "../../components/ErrorHandler";

import "./Popular.css";
import { useSearchParams } from "react-router-dom";

const Popular = () => {
  let [pageNumber] = useSearchParams();
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  let [page, setPage] = useState(pageNumber.get("page"));
  const [totalPages, setTotalPages] = useState();

  if (pageNumber.get("page") === null) {
    page = 1;
  }

  const fetchPopularMovies = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      setPopularMovies(data);
      setPage(data.page);
      setTotalPages(500);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const fetchMovieGenres = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovieGenres(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchMovieGenres();
  }, [page]);

  const goToPage = (value) => {
    if (popularMovies) {
      setPage(value);
    }
  };

  return (
    <>
      {!isLoading && hasError && (
        <ErrorHandler
          error={
            "Something wrong happened while fetching popular movies :("
          }
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && !hasError && (
        <>
          <MovieList
            title="Popular"
            info={popularMovies}
            error={hasError}
            page={page}
            goTo={goToPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
};

export default Popular;
