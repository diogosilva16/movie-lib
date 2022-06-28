import { FormControl, FormGroup, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Input = ({ setSearchQuery }) => {
  return (
    <FormGroup >
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => setSearchQuery(e.target.value)}
        label="Enter a movie name..."
        variant="outlined"
        placeholder="Search..."
        size="medium" />
      <IconButton type="submit" aria-label="search">
        <SearchIcon sx={{ fill: "blue" }} />
      </IconButton>
    </FormGroup>
  );
};

export default Input;
