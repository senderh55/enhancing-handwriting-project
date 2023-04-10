import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// FIXME - not fully implemented, need to fix and add Forgot password form and logic with email sending and reset password
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send forgot password request here
      // sendEmail(email, "Forgot Password", "Forgot Password");
      setSuccess(true);
      setError(null);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
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
                Forgot Password
              </Typography>
            </HeadingStyle>

            {success ? (
              <Typography variant="body1" sx={{ mb: 2 }}>
                A password reset link has been sent to your email address.
              </Typography>
            ) : (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Enter your email address below to receive a password reset
                  link.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{ mb: 2 }}
                  />

                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}

                  <Button type="submit" variant="contained">
                    Send
                  </Button>
                </form>
              </>
            )}

            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ mt: 2 }}
            >
              Back to login
            </Button>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ForgotPassword;
