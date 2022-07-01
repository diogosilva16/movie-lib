import React from "react";
import {
  Button,
  Container,
  Pagination,
  Grid,
  Box,
  PaginationItem,
} from "@mui/material";
import { GifTwoTone } from "@mui/icons-material";

const PaginationCont = (props) => {
  const { totalPages, page, goTo } = props;

  return (
    <Container>
      <Pagination
        sx={{ ul: { justifyContent: "center" } }}
        showFirstButton={page === 1 ? false : true}
        showLastButton={page === totalPages ? false : true}
        count={totalPages}
        onChange={(event, value) => {goTo(value)}}
        page={page}
      />
    </Container>
  );
};

export default PaginationCont;
