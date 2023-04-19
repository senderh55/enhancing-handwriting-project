import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import ForgotPasswordEmailForm from "../components/ForgotPasswordEmailForm";
import ForgotPasswordVerificationForm from "../components/ForgotPasswordVerificationForm";

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState(""); // email is used to send verification code
  // these two states are used to show the correct form and deliver the correct email to the verification form

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
              {!isEmailSent && (
                <>
                  <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Password forgotten? Please enter your e-mail address{" "}
                  </Typography>

                  <ForgotPasswordEmailForm
                    setEmail={setEmail}
                    setIsEmailSent={setIsEmailSent}
                  />
                </>
              )}

              {isEmailSent && (
                <>
                  <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Please enter the verification code that was sent to your
                    email address
                  </Typography>
                  <ForgotPasswordVerificationForm email={email} />
                </>
              )}
            </HeadingStyle>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ForgotPassword;
