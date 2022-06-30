import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
  Rating,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import BuildModal from "../../components/BuildModal";
import Portal from "../../components/utils/Portal";
import ErrorHandler from "../../components/ErrorHandler";
import RecMovies from "../../components/RecMovies";

const Movie = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [movieProviders, setMovieProviders] = useState([]);
  const [movieLinks, setMovieLinks] = useState([]);
  const [portalOpen, setPortalOpen] = useState(false);
  const [movieVideo, setMovieVideo] = useState([]);

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

  const getMovieVideo = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setMovieVideo(
          data.results.filter((x) => x.type === "Trailer").at(-1).key
        );
      } else {
        setMovieVideo("");
      }
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const openPortal = () => {
    setPortalOpen(!portalOpen);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieProviders();
    getMovieLinks();
    getMovieVideo();
  }, [id], [isLoading]);

  const _setMovieGenres = () => {
    if (movieInfo.genres) {
      return movieInfo.genres.map((genre, key) => (
        <Typography key={key}>
          <Link to={`/genre/${genre.id}`}>
            <Button variant="contained">{genre.name}</Button>
          </Link>
        </Typography>
      ));
    }
  };

  const _setMovieProviders = () => {
    if (movieProviders) {
      return movieProviders.hasOwnProperty("PT") &&
        movieProviders.PT.hasOwnProperty("flatrate") ? (
        movieProviders.PT.flatrate.map((provider, key) => (
          <Box pt={2}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${provider.logo_path}`}
              width="100"
            />
          </Box>
        ))
      ) : (
        <Box>
          <Typography variant="body2">
            No streaming services available. Can only be bought or rent at the
            moment.
          </Typography>
        </Box>
      );
    }
  };

  return (
    <>
      {!isLoading && hasError && <ErrorHandler error={hasError} />}
      {isLoading && <Loader />}
      {!isLoading && !hasError && (
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            paddingTop={{ xs: "7rem", xl: "0" }}
            paddingBottom={{ xs: "5rem", xl: "0" }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              sx={{}}
            >
              <Grid item md={4} xs={12}>
                <Box item className="movieCard">
                  <img
                    width="100%"
                    src={`https://image.tmdb.org/t/p/w342/${movieInfo.poster_path}`}
                  />
                </Box>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box className="movieDetails">
                  <Grid container>
                    <Grid item >
                      <Typography variant="h1">{movieInfo.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
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
                      <Typography variant="h4" >
                        {movieInfo.runtime} min. / {(movieInfo.release_date)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box className="movieRating">
                    <Grid container pt={1} alignItems="center">
                      <Grid item>
                        <Rating
                          name="movie-rating"
                          value={movieInfo.vote_average / 2}
                          precision={0.1}
                          readOnly
                          size="large"
                        />
                      </Grid>
                      <Grid item pl={2}>
                        <Typography>{movieInfo.vote_average}/10</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="movieGenres">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h2">Genres</Typography>
                      </Grid>
                      <Grid item container>
                        {_setMovieGenres()}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="movieSynopsis">
                    <Typography variant="h2">Synopsis</Typography>
                    <Typography variant="body2" paddingRight={3}>
                      {movieInfo.overview}
                    </Typography>
                  </Box>
                  <Box className="movieButtons" pt={3}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} md={4}>
                        <Typography variant="h2" sx={{ paddingTop: 0 }}>
                          External Links
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <a
                          href={`https://www.imdb.com/title/${movieLinks.imdb_id}`}
                          target="_blank"
                        >
                          <Button variant="contained">
                            <Typography>IMDB</Typography>
                          </Button>
                        </a>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Button
                          className="extBtn"
                          variant="contained"
                          onClick={openPortal}
                        >
                          <Typography>TRAILER</Typography>
                        </Button>
                        {portalOpen && (
                          <Portal id="modal-root">
                            <BuildModal
                              openPortal={openPortal}
                              videoId={movieVideo}
                            />
                          </Portal>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="movieProviders">
                    <Typography variant="h2">Providers in Portugal</Typography>
                    {_setMovieProviders()}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <RecMovies id={id} />
        </Container>
      )}
    </>
  );
};

export default Movie;
