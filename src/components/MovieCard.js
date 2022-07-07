import react from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Rating,
  Typography,
  Grid,
} from "@mui/material";

const MovieCard = (props) => {
  const { movie } = props;


  return (
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
        <Grid container justifyContent="center" alignItems="center" pt={2}>
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
  );
};

export default MovieCard;
