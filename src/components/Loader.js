import React from "react";
import { CircularProgress, Container, Grid } from "@mui/material";

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
        
        <CircularProgress />
      </Grid>
    </Container>
  );
};

export default Loader;
