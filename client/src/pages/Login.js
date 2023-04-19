import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";

import LoginForm from "../components/LoginForm";
import GoogleAuth from "../components/GoogleAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import Snackbar from "@mui/material/Snackbar";

import { motion } from "framer-motion";

//////////////////////////////////

const Login = () => {
  const { isLoggedIn, userIsVerified } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    // we use useEffect to check if user is logged in or not and redirect to userDashboard page
    if (isLoggedIn) {
      navigate("/userDashboard");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (userIsVerified) {
      setIsSnackbarOpen(true);
    }
  }, [userIsVerified]);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Login to your account
            </Typography>
          </HeadingStyle>
          <Box component={motion.div} {...fadeInUp}>
            <GoogleAuth />
          </Box>
          <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>
          <LoginForm />
          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={8000}
        onClose={handleSnackbarClose}
        message="User verified successfully! You can now login to your account."
      />
    </RootStyle>
  );
};

export default Login;
