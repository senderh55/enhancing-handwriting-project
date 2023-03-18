import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MainNavigation = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#0072c6" }}>
      <Toolbar style={{ justifyContent: "flex-end" }}>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
        >
          הרשמה
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          style={{ marginLeft: "20px" }}
        >
          כניסה
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
