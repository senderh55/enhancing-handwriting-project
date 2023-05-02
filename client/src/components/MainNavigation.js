import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import CreateIcon from "@mui/icons-material/Create";
import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";

const StyledSnackbar = styled(Snackbar)`
  && {
    width: 50%; /* change the width as needed */
    margin: auto; /* center the Snackbar horizontally */
    top: 90%; /* center the Snackbar vertically */
    transform: translateY(-50%);

    @media (max-width: 600px) {
      width: 100%; /* adjust the width for smaller screens */
    }
  }
`;

const MainNavigation = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const pages = isLoggedIn ? ["Logout"] : ["Signup", "Login"];

  // handle menu click and provide navigation functionality to the menu items
  const [anchorElNav, setAnchorElNav] = useState(null); // used to open and close the menu
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMenuClick = async (event) => {
    setAnchorElNav(null);
    const page = event.target.innerText.toLowerCase();

    if (page === "logout") {
      try {
        await logout();
      } catch (err) {
        setSnackbarOpen(true);
      }
    } else if (page === "login") {
      navigate("/login", { replace: true });
    } else if (page === "signup") {
      navigate("/signup", { replace: true });
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CreateIcon sx={{ mr: 2 }} />
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
              ScribbleBoost
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleMenuClick}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleMenuClick}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ScribbleBoost
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleMenuClick}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <StyledSnackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={"An error occurred. Please try again later."}
      />
    </>
  );
};

export default MainNavigation;
