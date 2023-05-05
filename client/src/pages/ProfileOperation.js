import React from "react";

import { Container, Typography } from "@mui/material";

import ProfileForm from "../components/ProfileForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import Logo from "../components/Logo";
//////////////////////////////////

const ProfileOperation = () => {
  const { isLoggedIn, isEditingProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              {isEditingProfile ? "Edit" : "Create"} Profile
            </Typography>
          </HeadingStyle>

          <ProfileForm />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          ></Typography>
        </ContentStyle>
        <Logo />
      </Container>
    </RootStyle>
  );
};

export default ProfileOperation;
