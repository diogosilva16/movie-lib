import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Navbar/Menu";
import Popular from "./Pages/Popular/Popular";
import Home from "./Pages/Home/Home";
import { Container, ThemeProvider } from "@mui/material";
import Theme from "./components/utils/Theme";
import Movie from "./Pages/Movie/Movie";
import Genre from "./Pages/Genres/Genre";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Menu />
          {/* <Container maxWidth="xl"> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/genre/:id" element={<Genre />} />
            </Routes>
          {/* </Container> */}
          {/* <Footer /> */}
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
