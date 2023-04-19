import React, { useContext, useState } from "react";
import { Container, Typography, Snackbar } from "@mui/material";
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "../theme";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ForgotPasswordEmailForm from "../components/ForgotPasswordEmailForm";

const ForgotPassword = () => {
  const [sendEmailButtonClicked, setSendEmailButtonClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // FIXME
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
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
              {!sendEmailButtonClicked && (
                <>
                  <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Password forgotten? Please enter your e-mail address{" "}
                  </Typography>

                  <ForgotPasswordEmailForm
                    onSubmit={setSendEmailButtonClicked}
                  />
                </>
              )}
            </HeadingStyle>

            {sendEmailButtonClicked && (
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Please enter the verification code that was sent to your email
                address
              </Typography>
            )}
            {error && (
              <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>
            )}
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message={`A password reset email has been sent to ${email}`}
            />
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ForgotPassword;
