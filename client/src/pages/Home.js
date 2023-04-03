import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
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
      <Typography variant="h4">Welcome to ScribbleBoost!</Typography>
      <Typography variant="h6">Please register or login to continue</Typography>
      <StyledButtonWrapper>
        <StyledButton variant="contained" color="primary" href="/signup">
          Register
        </StyledButton>
        <StyledButton variant="contained" color="secondary" href="/login">
          Login
        </StyledButton>
      </StyledButtonWrapper>
    </StyledContainer>
  );
};

export default Home;
