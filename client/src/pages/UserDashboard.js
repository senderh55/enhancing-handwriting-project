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

const UserDashboard = () => {
  const { isLoggedIn, userName, profiles, getSelectedProfile } =
    useContext(AuthContext);

  console.log(isLoggedIn, userName, profiles);

  const navigate = useNavigate();

  useEffect(() => {
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
      <ProfileCardContent>
        <ProfileTitle variant="h6">Your Profiles:</ProfileTitle>
        {profiles.map((profile) => (
          <ProfileButton
            key={profile.key}
            onClick={() => handleProfileButtonClick(profile.key)}
            variant="contained"
          >
            {`name:${profile.name.replace(/['"]/g, "")}, age:${profile.age}`}
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
