import React from "react";

import { Container, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import Logo from "../components/Logo";

//////////////////////////////////

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
        <Logo />
      </Container>
    </RootStyle>
  );
};

export default ChangePassword;
