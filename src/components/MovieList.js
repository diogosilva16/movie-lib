import React from "react";
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

const MovieList = (props) => {
  const { title, info } = props;

  return (
    <Container maxWidth="xl">
      <Box pt={5}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">Movies</Typography>
      </Box>
      <Grid container spacing={5} columnSpacing={5} pt={10} pb={20}>
        {info.results.map((movie, key) => (
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
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
