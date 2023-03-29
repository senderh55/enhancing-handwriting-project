import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  padding: 20px;
  width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #3f51b5;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  max-width: 150px;
  &:hover {
    background-color: #2c3e50;
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
    <Container>
      <Card>
        <h2>{selectedProfile.name} Dashboard</h2>
        <ButtonContainer>
          <Button>Practice</Button>
          <Button>Show Results</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button>Edit Profile</Button>
          <Button>Delete Profile</Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
};

export default ProfileDashboard;
