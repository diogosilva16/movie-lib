import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList";
import Loader from "../../components/Loader";

import "./Popular.css";

const Popular = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);

  const fetchPopularMovies = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setPopularMovies(data);
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
  }, []);

  const _setPopularMovieList = () => {
    if (popularMovies.results) {
      return popularMovies.results.map((movie, key) => (
        <Grid item xs={6} md={3} key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <Card className="card" sx={{ height: 650 }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography align="center" variant="h6">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ));
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    // <MovieList title="Popular" info={popularMovies} error={hasError}/>
    <Container maxWidth="xl">
      <Box pt={5}>
        <Typography variant="h1">Popular</Typography>
        <Typography variant="h6">Movies</Typography>
      </Box>
      <Grid container spacing={5} columnSpacing={5} pt={10} pb={20}>
        {_setPopularMovieList()}
      </Grid>
    </Container>
  );
};

export default Popular;
