import React, { useEffect, useState } from "react";

const Popular = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [popularMovies, setPopularMovies] = useState([]);

  const fetchPopularMovies = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    setPopularMovies(data.results);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  console.log(popularMovies);

  return (
    <>
      {popularMovies.map((movie, key) => (
        <div key={movie.id}>
            {movie.original_title}
        </div>
      ))}
    </>
  );
};

export default Popular;
