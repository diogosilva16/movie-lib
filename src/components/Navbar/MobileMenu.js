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
import { Link, useParams} from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
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
      <Grid container justifyContent="center">
        <Typography>Movie Library</Typography>
      </Grid>
      <List>
        {MenuData.map((page, index) => {
          return (
            <Box m={1} className="nav-text">
              <li key={index}>
                <Link to={page.path}>
                  <Button size="small" startIcon={<CircleIcon />}>
                    {page.title}
                  </Button>
                </Link>
              </li>
            </Box>
          );
        })}
      </List>
      <Divider />
      <List>
        {genreList.genres.map((genre, index) => {
          return (
            <Box m={1} className="nav-text">
              <Link to={`/genre/${genre.id}`}>
                <li key={index}>
                  <Button size="small" startIcon={<CircleIcon />} onClick={getGenres}>
                    {genre.name}
                  </Button>
                </li>
              </Link>
            </Box>
          );
        })}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { md: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
            <MenuIcon />
          </IconButton>
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
