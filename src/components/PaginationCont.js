import React from "react";
import {
  Container,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaginationCont = (props) => {
  const { totalPages, page, goTo } = props;
  const history = useNavigate();

  return (
    <Container>
      <Pagination
        sx={{ ul: { justifyContent: "center" } }}
        showFirstButton={page === 1 ? false : true}
        showLastButton={page === totalPages ? false : true}
        count={totalPages}
        onChange={(event, value) => {
          goTo(value);
          history(`?page=${value}`);
        }}
        page={page}
      />
    </Container>
  );
};

export default PaginationCont;
