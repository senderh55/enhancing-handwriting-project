import React from "react";

import { Container, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import ChangePasswordForm from "../components/ChangePasswordForm";
//////////////////////////////////
const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const ChangePassword = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
            <HeadingStyle
              component={motion.div}
              variants={fadeInUp}
              sx={{ mb: 5 }}
            >
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Change Password
              </Typography>
            </HeadingStyle>

            <ChangePasswordForm />
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ChangePassword;
