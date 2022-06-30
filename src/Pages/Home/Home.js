import { Container, Box, Typography, Grid } from "@mui/material";
import React from "react";
import Input from "../../components/Input";

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{ minHeight: "100%" }}
      >
        <Grid item>
          <Typography variant="h1"> 🎬 🎬 🎬 </Typography>
        </Grid>
        <Grid item pt={5}>
          <Typography>This project has been made with 💙 as a way to deepen my knowledge in React.</Typography>
        </Grid>
        <Grid item pt={5} sx={{fontStyle: "italic"}}>
          <Typography variant="caption">This product uses the TMDB API but is not endorsed or certified by TMDB.</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
