import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../../components/MovieList";
import Loader from "../../components/Loader";
import ErrorHandler from "../../components/ErrorHandler";

const Genre = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movieList, setMovieList] = useState({});
  const [movieGenres, setMovieGenres] = useState({ genres: [] });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const getMoviesByGenre = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`
      );
      const data = await response.json();
      setMovieList(data);
      setPage(data.page);
      setTotalPages(500);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const getGenres = async () => {
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

  const goToPage = (value) => {
    if (movieList) setPage(value);
  };

  useEffect(
    () => {
      getMoviesByGenre();
      getGenres();
    },
    [page, id]
  );

  const _getGenreName = () => {
    if (movieGenres.genres != "") {
      return movieGenres.genres.filter((genre) => genre.id === Number(id))[0]
        .name;
    }
  };

  return (
    <>
      {!isLoading && hasError && <ErrorHandler error={hasError} />}
      {isLoading && <Loader />}
      {!isLoading && !hasError && (
        <MovieList
          title={_getGenreName()}
          page={page}
          goTo={goToPage}
          totalPages={totalPages}
          info={movieList}
          padding={10}
        />
      )}
    </>
  );
};

export default Genre;
