import { Grid, Typography, Box, Container, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Movie = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [movieProviders, setMovieProviders] = useState([]);

  const getMovieDetails = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovieInfo(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const getMovieProviders = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovieProviders(data.results);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getMovieDetails();
    getMovieProviders();
  }, [isLoading]);

  console.log(movieInfo);
  console.log(movieProviders);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          <Box pt={10} pb={20}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item md={4} xs={12}>
                <div className="movieCard">
                  <img
                    width="100%"
                    src={`https://image.tmdb.org/t/p/w342/${movieInfo.poster_path}`}
                  />
                </div>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box className="movieDetails">
                  <Box className="movieText">
                    <Typography className="movieTitle">
                      {movieInfo.title}
                    </Typography>
                    <Typography variant="h6">{movieInfo.tagline}</Typography>
                    <Typography>
                      Release date: {movieInfo.release_date}
                    </Typography>
                  </Box>
                  <Box className="movieRating">
                    <Typography>Rating</Typography>
                    <Typography>{movieInfo.vote_average}/10</Typography>
                  </Box>
                  <Box className="movieGenres">
                    <Typography>Genres</Typography>
                    <Typography>
                      {movieInfo.genres.map((genre, key) => (
                        <Link to={`/genre/${genre.id}`}>
                          <span
                            key={key}
                          >
                            {genre.name}
                          </span>
                        </Link>
                      ))}
                    </Typography>
                  </Box>
                  <Box className="movieSynopsis">
                    <Typography>Synopsis</Typography>
                    <Typography>{movieInfo.overview}</Typography>
                  </Box>
                  <Box className="movieButtons">
                    <Button variant="contained" color="secondary">
                      <Typography>IMDB</Typography>
                    </Button>
                    <Button variant="contained" color="secondary">
                      <Typography>Website</Typography>
                    </Button>
                    <Button variant="contained" color="secondary">
                      <Typography>Trailer</Typography>
                    </Button>
                  </Box>
                  <Box className="movieProviders">
                    <Typography>Providers in Portugal</Typography>
                    {movieProviders.hasOwnProperty("PT") &&
                    movieProviders.PT.hasOwnProperty("flatrate") ? (
                      movieProviders.PT.flatrate.map((provider, key) => (
                        <Box>
                          <img
                            src={`https://image.tmdb.org/t/p/w342/${provider.logo_path}`}
                            width="100"
                          />
                          <Typography key={key}>
                            {provider.provider_name}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Box>
                        <Typography>
                          No streaming services available. Can only be bought or
                          rent at the moment.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Movie;
