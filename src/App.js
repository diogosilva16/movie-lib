import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popular from "./Pages/Popular/Popular";
import Home from "./Pages/Home/Home";
import { Grid, ThemeProvider, Box } from "@mui/material";
import Theme from "./components/utils/Theme";
import Movie from "./Pages/Movie/Movie";
import Genre from "./Pages/Genres/Genre";
import SearchPage from "./Pages/SearchPage/SearchPage";
import MobileMenu from "./components/Navbar/MobileMenu";
import TopRated from "./Pages/TopRated/TopRated";

const drawerWidth = 280;

function App() {
  return (
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Grid container>
            <MobileMenu />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                height: "100vh"
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/genre/:id" element={<Genre />} />
                <Route path="/search/:name" element={<SearchPage />} />
                <Route path="/top-rated" element={<TopRated />} />
              </Routes>
            </Box>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
