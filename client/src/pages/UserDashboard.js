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
  margin: 20px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const ProfileTitle = styled(Typography)`
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProfileButton = styled(Button)`
  margin: 8px;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  text-transform: none;
  background-color: #4caf50;
  color: #fff;
  &:hover {
    background-color: #388e3c;
  }
`;

const ProfileButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  & > * {
    margin: 8px;
  }
`;

const UserDashboard = () => {
  const { isLoggedIn, userName, profiles, getSelectedProfile } =
    useContext(AuthContext);

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
        <ProfileTitle>Welcome {userName}, Select Profile</ProfileTitle>
        <ProfileButtonWrapper>
          {profiles.map((profile) => (
            <ProfileButton
              key={profile.key}
              onClick={() => handleProfileButtonClick(profile.key)}
              variant="contained"
            >
              {`Name: ${profile.name}, Age: ${profile.age}`}
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
