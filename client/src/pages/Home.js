import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // we use useEffect to check if user is logged in or not and redirect to userDashboard page
    if (isLoggedIn) {
      navigate("/userDashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30vh",
      }}
    >
      <Typography variant="h4">Welcome to ScribbleBoost!</Typography>
      <Typography variant="h6">Please register or login to continue</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "8px" }}
          href="/signup"
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "8px" }}
          href="/login"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Home;
