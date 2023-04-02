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
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProfileButtonWrapper } from "../theme";

const ProfileCard = styled(Card)``;

const ProfileCardContent = styled(CardContent)``;

const ProfileTitle = styled(Typography)``;

const ProfileButton = styled(Button)``;

const UserDashboard = () => {
  const { isLoggedIn, userName, profiles, getSelectedProfile } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // we use useEffect to check if user is logged in or not
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleProfileButtonClick = (profileKey) => {
    getSelectedProfile(profileKey);
    navigate("/profileDashboard");
  };

  return (
    <ProfileCard>
      {profiles.length === 0 && (
        <ProfileTitle variant="h5" component="h5">
          Welcome {userName}, No profiles found
        </ProfileTitle>
      )}
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
              {`Name: ${profile.name}, Age: ${profile.age}, description: ${profile.description}`}
            </ProfileButton>
          ))}
        </ProfileButtonWrapper>
      </ProfileCardContent>
      <CardActions>
        <ProfileButton
          variant="contained"
          component={RouterLink}
          to="/createProfile"
        >
          Add Profile
        </ProfileButton>
      </CardActions>
    </ProfileCard>
  );
};

export default UserDashboard;
