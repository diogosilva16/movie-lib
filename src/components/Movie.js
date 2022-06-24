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
  const [movieLinks, setMovieLinks] = useState([]);

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

  const getMovieLinks = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovieLinks(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieProviders();
    getMovieLinks();
  }, [isLoading]);

  console.log(movieInfo);
  console.log(movieProviders);
  console.log(movieLinks);

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
              sx={{ backgroundColor: "white", borderRadius: "30px" }}
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
                  <Grid container>
                    <Grid item>
                      <Typography className="movieTitle">
                        {movieInfo.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="movieTagline">
                        {movieInfo.tagline}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent="flex-end"
                      mr={10}
                    >
                      <Typography>
                        <span>Release date:</span> {movieInfo.release_date}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box className="movieRating">
                    <Typography className="rating">Rating</Typography>
                    <Typography className="movieR">
                      {movieInfo.vote_average}/10
                    </Typography>
                  </Box>
                  <Box className="movieGenres">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="genres">Genres</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {movieInfo.genres.map((genre, key) => (
                            <Link to={`/genre/${genre.id}`}>
                              <Button
                                variant="contained"
                                color="error"
                                key={key}
                              >
                                {genre.name}
                              </Button>
                            </Link>
                          ))}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="movieSynopsis">
                    <Typography className="synopsis">Synopsis</Typography>
                    <Typography>{movieInfo.overview}</Typography>
                  </Box>
                  <Box className="movieButtons">
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} md={4}>
                        <Typography className="extLinks">
                          External Links
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Button variant="contained" color="secondary">
                          <a href={`https://www.imdb.com/title/${movieLinks.imdb_id}`}>
                            <Typography>IMDB</Typography>
                          </a>
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Button variant="contained" color="secondary">
                          <Typography>TRAILER</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="movieProviders">
                    <Typography className="providers">
                      Providers in Portugal
                    </Typography>
                    {movieProviders.hasOwnProperty("PT") &&
                    movieProviders.PT.hasOwnProperty("flatrate") ? (
                      movieProviders.PT.flatrate.map((provider, key) => (
                        <Box>
                          <img
                            src={`https://image.tmdb.org/t/p/w342/${provider.logo_path}`}
                            width="100"
                          />
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
