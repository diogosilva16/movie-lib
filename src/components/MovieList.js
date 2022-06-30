import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import noImage from "../img/no_image.svg";

const MovieList = (props) => {
  const { title, info, isLoading, error } = props;

  const _setMovieList = (movieList) => {
    if (movieList.results) {
      return (
        <>
          {movieList.results.map((movie, key) => (
            <Grid item xs={12} md={3} key={key} >
              <Link to={`/movie/${movie.id}`}>
                <Card className="card" sx={{ height: "100%"}}>
                  <CardMedia
                    component="img"
                    image={`${movie.poster_path !== null ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : "https://via.placeholder.com/342x600"}`}
                    alt={movie.title}
                  />
                  <CardContent >
                    <Typography align="center" variant="h6">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          <Box pt={10}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h6">Movies</Typography>
          </Box>
          <Grid container spacing={5} columnSpacing={5} pt={10} pb={20}>
            {error ? "<p>error</p>" : _setMovieList(info)}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default MovieList;
