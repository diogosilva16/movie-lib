import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { MenuData } from "./MenuData";
import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SearchBox from "./SearchBox.js";
const drawerWidth = 280;

function MobileMenu(props) {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [genreList, setGenreList] = useState({ genres: [] });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getGenres = async () => {
    setHasError(false);
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenreList(data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getGenres();
  }, [isLoading]);

  const drawer = (
    <Box pt={5}>
      <Grid container justifyContent="center" paddingBottom={5}>
        <Typography variant="subtitle2">Movie Library</Typography>
      </Grid>
      <Divider />
      <List>
        <Typography variant="h3" m={1} paddingBottom={2}>
          Discover
        </Typography>
        {MenuData.map((page, key) => {
          return (
            <Box m={1} className="nav-text">
              <Link to={page.path}>
                <li key={key}>
                  <Button size="small" startIcon={<CircleIcon />}>
                    {page.title}
                  </Button>
                </li>
              </Link>
            </Box>
          );
        })}
      </List>
      <Divider />
      <List>
        <Typography variant="h3" m={1} paddingBottom={2}>
          Genres
        </Typography>
        {genreList.genres.map((genre, key) => {
          return (
            <Box m={1} className="nav-text">
              <Link to={`/genre/${genre.id}`}>
                <li key={key}>
                  <Button
                    size="small"
                    startIcon={<CircleIcon />}
                    onClick={getGenres}
                  >
                    {genre.name}
                  </Button>
                </li>
              </Link>
            </Box>
          );
        })}
      </List>
      <Divider />
      <Grid container justifyContent="center" padding={3}>
        <Typography variant="caption">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Typography>
        <Box padding={5} paddingBottom={1}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="TMDB logo"
            width={100}
          />
        </Box>
      </Grid>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          // display: { md: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Box padding={1}>
            <SearchBox />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default MobileMenu;
