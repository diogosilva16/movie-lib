import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#595959",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: "2rem",
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
    h3: {
      fontWeight: "bold",
      fontSize: "1.2rem"
    }
  },
});

export default Theme;
