import Reac, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieList from "../../components/MovieList";
import Loader from "../../components/Loader";
import ErrorHandler from "../../components/ErrorHandler";
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

const Genre = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [movieList, setMovieList] = useState({});
  const [movieGenres, setMovieGenres] = useState({ genres: [] });

  console.log(isLoading);

  const getMoviesByGenre = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`
      );
      const data = await response.json();
      setMovieList(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const getGenres = async () => {
    setIsLoading(false);
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
    getMoviesByGenre();
    getGenres();
  }, [isLoading]);

  // const genres = movieGenres.genres
  //   ? movieGenres.genres.filter((genre) => genre.id === Number(id))
  //   : [];

  const _setMovieList = () => {
    if (movieList.results) {
      return movieList.results.map((movie, key) => (
        <Grid item xs={6} md={3} key={key}>
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

  const _getGenreName = () => {
    if (movieGenres.genres != "") {
      return movieGenres.genres.filter((genre) => genre.id === Number(id))[0].name;
    }
  };

  return (
    <>
      {/* {setHasError(true)} */}
      {!isLoading && hasError && <ErrorHandler error={hasError} />}
      {isLoading && <Loader />}
      {/* {!isLoading  && !hasError && (<MovieList title={genres} info={movieList} isLoading={isLoading} />)}; */}
      {/* {!isLoading && !hasError && (console.log(movieGenres.genres.filter((genre) => genre.id === Number(id)).name))} */}

      {!isLoading && !hasError && (
        <Container maxWidth="xl">
          <Box pt={5}>
            <Typography variant="h1">{_getGenreName()}</Typography>
            <Typography variant="h6">Movies</Typography>
          </Box>
          <Grid container spacing={5} columnSpacing={5} pt={10} pb={20}>
            {_setMovieList()}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Genre;
