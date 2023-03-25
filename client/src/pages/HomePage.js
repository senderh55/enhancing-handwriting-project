import React from "react";
import { Button, Typography } from "@mui/material";

const HomePage = () => {
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
