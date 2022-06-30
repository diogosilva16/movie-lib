import {
  FormControl,
  FormGroup,
  IconButton,
  Select,
  TextField,
  Box,
  Grid,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Input = () => {
  return (
    <Box justifyContent="center">
      <form>
        <TextField
          id="search-bar"
          className="text"
          label="Enter a movie name..."
          variant="outlined"
          placeholder="Search..."
          fullWidth
          size="small"
          // sx={{width: "100%"}}
        />
        {/* <IconButton type="submit" aria-label="search">
        <SearchIcon sx={{ fill: "blue" }} />
      </IconButton> */}
        <Grid container paddingTop={5} spacing={2} justifyContent="center">
          <Grid item>
            <TextField
              size="small"
              label="Genre"
              sx={{ width: 200 }}
              select
            >
              <MenuItem value="teste">Teste</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              size="small"
              label="Rating"
              sx={{ width: 200 }}
              select
            >
              <MenuItem value="teste">Teste</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              size="small"
              label="Small select"
              sx={{ width: 200 }}
              select
            >
              <MenuItem value="teste">Teste</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Input;
