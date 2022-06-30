import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../../components/MovieList";

const SearchPage = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { name } = useParams();

  console.log(name)

  const fetchQueryMovies = async (query) => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQueryMovies(name);
  }, [name]);

  console.log(movies);

  return <MovieList title={name} info={movies} padding={10} />;
};

export default SearchPage;
