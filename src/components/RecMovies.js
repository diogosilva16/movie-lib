import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ErrorHandler from "./ErrorHandler";

const RecMovies = (props) => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const { id } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [recMovies, setRecMovies] = useState([]);

  const fetchRecMovies = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
      );
      const data = await response.json();
      setRecMovies(data.results);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(
    () => {
      fetchRecMovies();
    },
    [id],
    [isLoading]
  );

  const _setRecMovies = (recMovies) => {
    if (recMovies.length > 0) {
      return (
        <>
          {recMovies.map((movie, key) => (
            <Grid item xs={12} md={3} key={key}>
              <Link to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </Grid>
          ))}
        </>
      );
    } else {
      return (
        <Grid item>
          <Typography variant="h3">
            No recommended movies available :(
          </Typography>
        </Grid>
      );
    }
  };

  return (
    <>
      {!isLoading && hasError && (
        <ErrorHandler
          error={
            "Something wrong happened while fetching recommended movies :("
          }
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && !hasError && (
        <>
          <Box pt={5}>
            <Typography variant="subtitle2">Recommended</Typography>
            <Typography variant="h6">Movies</Typography>
          </Box>
          <Grid container spacing={5} columnSpacing={5} pt={10} pb={20}>
            {_setRecMovies(recMovies)}
          </Grid>
        </>
      )}
    </>
  );
};

export default RecMovies;
