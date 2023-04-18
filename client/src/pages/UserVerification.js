import React, { useContext } from "react";

import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import { AuthContext } from "../context/authContext";

import UserVerificationForm from "../components/UserVerificationForm";
//////////////////////////////////

const UserVerification = () => {
  const { userEmail } = useContext(AuthContext);
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
                Please enter verification code that was sent to the following
                email: {userEmail}
              </Typography>
            </HeadingStyle>

            <UserVerificationForm />
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default UserVerification;
