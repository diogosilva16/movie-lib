import React from "react";
import { Box, Skeleton } from "@mui/material";

const MenuSkeleton = (props) => {
  const { size } = props;

  return (
    <Box m={1}>
      {[...Array(size)].map((size, i) => (
        <span className="busterCards" key={i}>
          <Skeleton variant="text" width={120}/>
        </span>
      ))}
    </Box>
  );
};

export default MenuSkeleton;
