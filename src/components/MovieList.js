import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import noImage from "../img/no_image.svg";
import PaginationCont from "./PaginationCont";

const MovieList = (props) => {
  const {
    title,
    info,
    isLoading,
    error,
    padding,
    page,
    totalPages,
    goTo
  } = props;

  const _setMovieList = (movieList) => {
    if (movieList.results) {
      return (
        <>
          {movieList.results.map((movie, key) => (
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
      <Typography>No recommended movies available. :(</Typography>;
    }
  };

  return (
    <>
      {/* {!isLoading && hasError && <ErrorHandler error={hasError} />} */}
      {isLoading && <Loader />}
      {!isLoading && (
        <Container maxWidth="xl">
          <Box pt={padding}>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography variant="h6">Movies</Typography>
          </Box>
          <Grid container spacing={5} columnSpacing={5} pt={10} pb={10}>
            {error ? "<p>error</p>" : _setMovieList(info)}
          </Grid>
          <Box pb={5}>
          <PaginationCont page={page} goTo={goTo} totalPages={totalPages} />

          </Box>
        </Container>
      )}
    </>
  );
};

export default MovieList;
