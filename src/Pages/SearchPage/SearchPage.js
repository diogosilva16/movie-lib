import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../../components/MovieList";
import Loader from "../../components/Loader";
import ErrorHandler from "../../components/ErrorHandler";
const SearchPage = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const { name } = useParams();

  const fetchQueryMovies = async (query) => {
    setIsLoading(true);
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}&page=${page}`
      );
      const data = await response.json();
      setMovies(data);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const goToPage = (value) => {
    if (movies) setPage(value);
  };

  useEffect(() => {
    fetchQueryMovies(name);
  }, [name, page]);

  return (
    <>
      {!isLoading && hasError && (
        <ErrorHandler
          error={
            "Something wrong happened while searching for movies :("
          }
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && !hasError && (
        <MovieList
          title={name}
          info={movies}
          page={page}
          goTo={goToPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default SearchPage;
