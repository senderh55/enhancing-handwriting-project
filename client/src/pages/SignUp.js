import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link } from "@mui/material";

import SignupForm from "../components/SignupForm";
// import Logo from "../components/Logo";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import Logo from "../components/Logo";

//////////////////////////////////

const Signup = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // we use useEffect to check if user is logged in or not and redirect to userDashboard page
    if (isLoggedIn) {
      navigate("/userDashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Please enter your details below.
            </Typography>
          </HeadingStyle>

          <SignupForm />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Signup;
