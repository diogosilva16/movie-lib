import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";

const TopRated = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const fetchTopRatedMovies = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      setTopRatedMovies(data);
      setPage(data.page);
      setTotalPages(500);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const goToPage = (value) => {
    if (topRatedMovies) setPage(value);
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, [page]); 

  return isLoading ? (
    <Loader />
  ) : (
    <MovieList
      title="Top Rated"
      info={topRatedMovies}
      page={page}
      goTo={goToPage}
      totalPages={totalPages}
      error={hasError}
      padding={10}
    />
  );
};

export default TopRated;
