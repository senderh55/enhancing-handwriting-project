import React, { useContext } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const initialButtons = (
  <>
    <Button component={Link} to="/signup" variant="contained" color="primary">
      Signup
    </Button>
    <Button
      component={Link}
      to="/login"
      variant="contained"
      color="primary"
      style={{ marginLeft: "20px" }}
    >
      Login
    </Button>
  </>
);

const MainNavigation = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <AppBar position="static" style={{ backgroundColor: "#0072c6" }}>
      <Toolbar>
        {isLoggedIn ? (
          <Button
            onClick={logout}
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
          >
            Logout
          </Button>
        ) : (
          initialButtons
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
