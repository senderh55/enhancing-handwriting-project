import React from "react";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  // FIXME: This is a hack to get the user to the dashboard if they are logged in and try to go to the home page (i.e. /)
  // const { isLoggedIn } = React.useContext(AuthContext);
  // console.log(`HomePage isLoggedIn: ${isLoggedIn}`);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/userDashboard", { replace: true });
  // }, [isLoggedIn]);

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
      <Typography variant="h4">Welcome to my website</Typography>
      <Typography variant="subtitle1">
        Please register or login to continue
      </Typography>
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

export default HomePage;
