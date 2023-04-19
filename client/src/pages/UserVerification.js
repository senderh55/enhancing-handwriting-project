import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Snackbar } from "@mui/material";
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import { AuthContext } from "../context/authContext";
import { Button } from "@mui/material";
import UserVerificationForm from "../components/UserVerificationForm";
import { useNavigate } from "react-router-dom";

const UserVerification = () => {
  const { resendVerificationCode } = useContext(AuthContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  // get the user email from the local storage (solution to the problem of refreshing the page)
  const userEmail = localStorage.getItem("userEmail"); // get the user email from the local storage
  console.log(userEmail);

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  const handleResendVerificationButton = () => {
    console.log(userEmail);
    resendVerificationCode(userEmail);
    setIsSnackbarOpen(true); // set the state to open the Snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false); // set the state to close the Snackbar
  };

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
            <Typography
              sx={{ color: "text.primary", mb: 6, textAlign: "center" }}
            >
              Didn't receive the email?
              <Button
                variant="subtitle5"
                onClick={handleResendVerificationButton}
              >
                Resend
              </Button>
            </Typography>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Verification email sent!"
            />
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default UserVerification;
