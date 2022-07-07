import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import noImage from "../img/no_image.svg";
import PaginationCont from "./PaginationCont";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, info, isLoading, error, page, totalPages, goTo } =
    props;

  const _setMovieList = (movieList) => {
    if (movieList.results) {
      return movieList.results.map((movie, key) => (
        <Grid item xs={12} md={3} key={key}>
          <Link to={`/movie/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </Grid>
      ));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box pt={10}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h6">Movies</Typography>
      </Box>
      <Grid container spacing={5} columnSpacing={5} pt={10} pb={10}>
        {_setMovieList(info)}
      </Grid>
      <Box pb={5}>
        <PaginationCont page={page} goTo={goTo} totalPages={totalPages} />
      </Box>
    </Container>
  );
};

export default MovieList;
