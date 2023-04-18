import React from "react";

import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";

import UserValidationForm from "../components/UserValidationForm";
//////////////////////////////////

const UserValidatation = () => {
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
                Please enter validation code that was sent to your email
              </Typography>
            </HeadingStyle>

            <UserValidationForm />
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default UserValidatation;
