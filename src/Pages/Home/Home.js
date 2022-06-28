import { Container, Box, Typography, Grid } from "@mui/material";
import React from "react";
import Input from "../../components/Input";

const Home = () => {
  return (
    <Container maxWidth="xl" >
      <Box pt={15}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h1">Movie Database xy</Typography>
          </Grid>
          <Grid item pt={5}>
            <Input />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
