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
      textTransform: "uppercase",
    },
    subtitle2: {
      fontSize: "2rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#595959",
    },
    h2: {
      paddingTop: "20px",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textTransform: "uppercase",
    },
    body2: {
      fontWeight: "400",
      fontSize: "1.2rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    h4: {
      fontSize: "1rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      color: "#595959",
    },
    h6: {
      fontSize: "1.2rem",
      color: "#595959",
      fontWeight: "600",
      textTransform: "uppercase",
    },
    h5: {
      fontSize: "1.3rem",
      color: "#595959",
    }
  },
});

export default Theme;
