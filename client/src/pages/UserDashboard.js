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

const ProfileCard = styled(Card)`
  min-width: 275px;
  background-color: #2196f3;
  color: #fff;
  margin-top: 32px;
`;

const ProfileCardContent = styled(CardContent)`
  text-align: center;
`;

const ProfileTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
`;

const ProfileButton = styled(Button)`
  margin: 8px;
`;

const UserDashboard = () => {
  const { isLoggedIn, userName, profiles } = useContext(AuthContext);
  console.log(isLoggedIn, userName, profiles);
  const navigate = useNavigate();

  useEffect(() => {
    // user is not logged in, redirect to home page
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileTitle variant="h6">Your Profiles:</ProfileTitle>
        {profiles.map((profile) => (
          <ProfileButton key={profile.key} variant="contained">
            {`${profile.name} ${profile.age}`}
          </ProfileButton>
        ))}
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
