import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useNavigate } from "react-router-dom";

const ErrorHandler = (props) => {
  const { error } = props;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Grid
        container
        direction="column"
        pt={10}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100%" }}
      >
        <Grid item>
          <Typography variant="h4">{error}</Typography>
        </Grid>
        <Grid item pt={5}>
          <Button
            startIcon={<KeyboardBackspaceOutlinedIcon />}
            variant="outlined"
            onClick={goBack}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorHandler;
