import React from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Grid
        container
        pt={10}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100%" }}
      >
        {/* <Typography>Loading...</Typography> */}
        <CircularProgress />
      </Grid>
    </Container>
  );
};

export default Loader;
