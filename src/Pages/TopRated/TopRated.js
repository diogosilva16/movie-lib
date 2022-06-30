import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";

const TopRated = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const fetchTopRatedMovies = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      const data = await response.json();
      setTopRatedMovies(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, [isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <MovieList title="Top Rated" info={topRatedMovies} error={hasError} padding={10} />
  );
};

export default TopRated;
