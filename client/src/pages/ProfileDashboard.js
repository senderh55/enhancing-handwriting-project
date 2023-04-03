import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { ProfileButtonWrapper } from "../theme";

const ProfileCard = styled(Card)``;

const ProfileCardContent = styled(CardContent)``;

const ProfileTitle = styled(Typography)``;

const ProfileButton = styled(Button)``;

const ProfileDashboard = () => {
  const { selectedProfile, isLoggedIn, setIsEditingProfile } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // This useEffect is used to redirect the user to the UserDashboard component if the user is not logged in.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleEditProfileButtonClick = () => {
    setIsEditingProfile(true);
    navigate("/profileOperation");
  };

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileTitle variant="h5">
          {selectedProfile.name} Dashboard
        </ProfileTitle>

        <ProfileButtonWrapper>
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
            onClick={handleEditProfileButtonClick}
            variant="contained"
          >
            Edit profile
          </ProfileButton>
          <ProfileButton
            variant="contained"
            component={RouterLink}
            to="/DeleteProfile"
          >
            Delete Profile
          </ProfileButton>
        </ProfileButtonWrapper>
      </ProfileCardContent>
    </ProfileCard>
  );
};

export default ProfileDashboard;
