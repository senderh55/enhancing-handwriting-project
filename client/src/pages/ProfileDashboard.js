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

const ProfileCard = styled(Card)``;

const ProfileCardContent = styled(CardContent)``;

const ProfileTitle = styled(Typography)``;

const ProfileButton = styled(Button)``;

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
        <ProfileTitle variant="h5">
          {selectedProfile.name} Dashboard
        </ProfileTitle>

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
