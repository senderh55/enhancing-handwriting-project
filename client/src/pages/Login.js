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
  const { isLoggedIn, userIsVerified, IsPasswordReset } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isVerifiedSnackbarOpen, setIsVerifiedSnackbarOpen] = useState(false);
  const [IsPasswordResetSnackbarOpen, setIsPasswordResetSnackbarOpen] =
    useState(false);

  useEffect(() => {
    // we use useEffect to check if user is logged in or not and redirect to userDashboard page
    if (isLoggedIn) {
      navigate("/userDashboard");
    }
  }, [isLoggedIn, navigate]);

  // when we enter the login page, we check if the user is just verified or just reset the password
  // if so, we show a snackbar message to the user to notify him
  useEffect(() => {
    if (userIsVerified) {
      setIsVerifiedSnackbarOpen(true);
    }
  }, [userIsVerified]);

  useEffect(() => {
    if (IsPasswordReset) {
      setIsPasswordResetSnackbarOpen(true);
    }
  }, [IsPasswordReset]);

  const handleVerifiedSnackbarClose = () => {
    setIsVerifiedSnackbarOpen(false);
  };

  const verifiedSnackBarMessage = (
    <Snackbar
      open={isVerifiedSnackbarOpen}
      autoHideDuration={8000}
      onClose={handleVerifiedSnackbarClose}
      message="User verified successfully! You can now login to your account."
    />
  );

  const handleResetSnackbarClose = () => {
    setIsPasswordResetSnackbarOpen(false);
  };

  const resetPasswordSnackBarMessage = (
    <Snackbar
      open={IsPasswordResetSnackbarOpen}
      autoHideDuration={8000}
      onClose={handleResetSnackbarClose}
      message="The password has been successfully reset! You can now login to your account."
    />
  );

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
      {verifiedSnackBarMessage}
      {resetPasswordSnackBarMessage}
    </RootStyle>
  );
};

export default Login;
