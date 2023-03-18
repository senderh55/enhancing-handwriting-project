import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: theme.spacing(3),
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  subheading: {
    fontSize: "1.5rem",
    textAlign: "right",
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    fontSize: "1.2rem",
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.subheading} variant="h4">
        ברוכים הבאים !
      </Typography>
    </Box>
  );
}

export default HomePage;
