import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Navbar/Menu";
import Popular from "./Pages/Popular";
import Home from "./Pages/Home";
import { Container, ThemeProvider } from "@mui/material";
// import {Theme} from "./components/utils/Theme";
import Movie from "./components/Movie";
import Genre from "./Pages/Genre";

function App() {
  return (
    <>
      {/* <ThemeProvider theme={Theme}> */}
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
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
