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
    if (recMovies) {
      return (
        <>
          {recMovies.map((movie, key) => (
            <Grid item xs={12} md={3} key={key}>
              <Link to={`/movie/${movie.id}`}>
                <Card className="card" sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    image={`${
                      movie.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                        : "https://via.placeholder.com/342x600"
                    }`}
                    alt={movie.title}
                  />
                  <CardContent align="center">
                    <Typography variant="h5">{movie.title}</Typography>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      pt={2}
                    >
                      <Rating
                        name="movie-rating"
                        value={movie.vote_average / 2}
                        precision={0.1}
                        readOnly
                      />
                      <Typography>({movie.vote_average})</Typography>
                    </Grid>
                  </CardContent>
                </Card>
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
      {isLoading ? (
        <Loader />
      ) : (
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
