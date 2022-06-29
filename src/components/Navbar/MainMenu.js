// import React, { useState } from "react";
// import styled from "styled-components";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import { MenuData } from "./MenuData";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import { IconContext } from "react-icons";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const MainMenu = () => {
  // const [sidebar, setSidebar] = useState(false);

  // const showSidebar = () => setSidebar(!sidebar);

  // return (
  //   <>
  //     <IconContext.Provider value={{color: "#fff"}}>
  //       <div className="navbar">
  //         <Link to="#" className="menu-bars">
  //           <FaIcons.FaBars onClick={showSidebar} />
  //         </Link>
  //       </div>
  //       <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
  //         <ul className="nav-menu-items" onClick={showSidebar}>
  //           <li className="navbar-toggle">
  //             <Link to="#" className="menu-bars">
  //               <AiIcons.AiOutlineClose />
  //             </Link>
  //           </li>
  //           {MenuData.map((item, index) => {
  //             return (
  //               <li key={index} className={item.cName}>
  //                 <Link to={item.path}>
  //                   {item.icon}
  //                   <span>{item.title}</span>
  //                 </Link>
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </nav>
  //     </IconContext.Provider>
  //   </>

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIE DATABASE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {MenuData.map((page, index) => {
              return (
                <li key={index} className={page.cName}>
                  <Link to={page.path}>
                    <span>{page.title}</span>
                  </Link>
                </li>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainMenu;
