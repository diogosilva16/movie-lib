import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#8F8CC3",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontWeight: "300",
    },
    h2: {
      paddingTop: "20px",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    body2: {
      fontWeight: "400",
    },
  },
});

export default Theme;
