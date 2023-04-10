import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import About from "../components/About";
import Contact from "../components/Contact";

import styled from "styled-components";
import { motion } from "framer-motion";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  margin: 8px;
  &:first-of-type {
    margin-right: 16px;
  }
`;

const names = [
  { name: "Sender Hodik", email: "senderh55@gmail.com", linkedin: "senderh55" },
  { name: "Idan Brauner", email: "idann79@gmail.com", linkedin: "???" },
  { name: "Anat Dahan", email: "anatdhn@braude.ac.il", linkedin: "???" },
  { name: "Navit Roth", email: "avroth@braude.ac.il", linkedin: "????" },
];

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // we use useEffect to check if user is logged in or not and redirect to userDashboard page
    if (isLoggedIn) {
      navigate("/userDashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <StyledContainer>
      <About />

      <Typography
        variant="h6"
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        fontSize={24}
      >
        Please register or login to continue
      </Typography>
      <StyledButtonWrapper
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <StyledButton variant="contained" color="primary" href="/signup">
          Register
        </StyledButton>
        <StyledButton variant="contained" color="secondary" href="/login">
          Login
        </StyledButton>
      </StyledButtonWrapper>

      <Contact contacts={names} />
    </StyledContainer>
  );
};

export default Home;
