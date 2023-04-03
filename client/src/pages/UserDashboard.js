import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProfileButtonWrapper } from "../theme";

const ProfileCard = styled(Card)``;

const ProfileCardContent = styled(CardContent)``;

const ProfileTitle = styled(Typography)``;

const ProfileButton = styled(Button)``;

const UserDashboard = () => {
  const {
    isLoggedIn,
    userName,
    profiles,
    getSelectedProfile,
    setSelectedProfile,
    setIsEditingProfile,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // we use useEffect to check if user is logged in or not
    if (!isLoggedIn) {
      navigate("/");
    }
    setSelectedProfile({}); // we set selected profile to empty object because the case we got back to user dashboard from profile dashboard
  }, [isLoggedIn, navigate, setSelectedProfile]);

  const handleProfileButtonClick = (profileKey) => {
    getSelectedProfile(profileKey);
    navigate("/profileDashboard");
  };

  const handleCreateProfileButtonClick = () => {
    setIsEditingProfile(false);
    navigate("/profileOperation");
  };

  return (
    // profile title should be displayed in the middle of the screen

    <ProfileCard>
      <ProfileCardContent>
        <ProfileTitle variant="h5" component="h5">
          Welcome {userName}, Select Profile
        </ProfileTitle>
        <ProfileButtonWrapper>
          {profiles.map((profile) => (
            <ProfileButton
              key={profile.key}
              onClick={() => handleProfileButtonClick(profile.key)}
              variant="contained"
            >
              {`Name: ${profile.name}, Age: ${profile.age}, Description: ${profile.description}`}
            </ProfileButton>
          ))}
        </ProfileButtonWrapper>
      </ProfileCardContent>
      <CardActions>
        <ProfileButtonWrapper>
          <ProfileButton
            onClick={handleCreateProfileButtonClick}
            variant="contained"
          >
            Add Profile
          </ProfileButton>
        </ProfileButtonWrapper>
      </CardActions>
    </ProfileCard>
  );
};

export default UserDashboard;
