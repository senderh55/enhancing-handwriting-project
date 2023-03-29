import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const ProfileCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  margin: 32px auto;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

const ProfileCardContent = styled(CardContent)`
  text-align: center;
`;

const ProfileTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ProfileButton = styled(Button)`
  margin: 8px;
  background-color: #2196f3;
  color: #fff;
  &:hover {
    background-color: #1769aa;
  }
`;

const ProfileDashboard = () => {
  const { selectedProfile, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // This useEffect is used to redirect the user to the UserDashboard component if the user is not logged in.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileTitle>{selectedProfile.name} Dashboard</ProfileTitle>

        <CardActions>
          <ProfileButton
            variant="contained"
            component={RouterLink}
            to="/practice"
          >
            Practice
          </ProfileButton>
          <ProfileButton
            variant="contained"
            component={RouterLink}
            to="/Results"
          >
            Results
          </ProfileButton>
          <ProfileButton
            variant="contained"
            component={RouterLink}
            to="/EditProfile"
          >
            Edit profile
          </ProfileButton>
          <ProfileButton
            variant="contained"
            component={RouterLink}
            to="/practice"
          >
            Delete Profile
          </ProfileButton>
        </CardActions>
      </ProfileCardContent>
    </ProfileCard>
  );
};

export default ProfileDashboard;
