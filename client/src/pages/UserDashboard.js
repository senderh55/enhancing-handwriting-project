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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greeting = styled(Typography)`
  margin-top: 32px;
`;

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

  return (
    <Wrapper>
      {isLoggedIn ? (
        <Greeting variant="h4" gutterBottom>
          Hello, {userName}!
        </Greeting>
      ) : (
        <Greeting variant="h4" gutterBottom>
          Please log in to view your dashboard.
        </Greeting>
      )}
      {isLoggedIn && (
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
            <ProfileButton variant="contained">Add Profile</ProfileButton>
          </CardActions>
        </ProfileCard>
      )}
    </Wrapper>
  );
};

export default UserDashboard;
