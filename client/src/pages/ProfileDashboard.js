import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useContext } from "react";

import { AuthContext } from "../context/authContext";

import { useNavigate } from "react-router-dom";

import { Link as RouterLink } from "react-router-dom";

import {
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { ProfileButtonWrapper } from "../theme";

const ProfileCard = styled(Card)``;

const ProfileCardContent = styled(CardContent)``;

const ProfileTitle = styled(Typography)``;

const ProfileButton = styled(Button)``;

const ProfileDashboard = () => {
  const { selectedProfile, isLoggedIn, setIsEditingProfile, deleteProfile } =
    useContext(AuthContext);

  const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(false);

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

  const handleDeleteProfileButtonClick = () => {
    setConfirmDeleteMsg(true);
  };

  const handleCancelDeleteProfile = () => {
    setConfirmDeleteMsg(false);
  };

  const handleConfirmDeleteProfile = async () => {
    await deleteProfile(); // we use await to prevent the user from being redirected before the deleteProfile function has finished executing
    setConfirmDeleteMsg(false);
    navigate("/");
  };

  const practiceButton = (
    <ProfileButton variant="contained" component={RouterLink} to="/practice">
      Practice
    </ProfileButton>
  );
  const resultsButton = (
    <ProfileButton variant="contained" component={RouterLink} to="/Results">
      Results
    </ProfileButton>
  );

  const editProfileButton = (
    <ProfileButton onClick={handleEditProfileButtonClick} variant="contained">
      Edit profile
    </ProfileButton>
  );

  const deleteProfileButton = (
    <ProfileButton
      onClick={handleDeleteProfileButtonClick}
      variant="contained"
      color="error"
    >
      Delete Profile
    </ProfileButton>
  );

  const deleteProfileDialog = (
    <Dialog open={confirmDeleteMsg} onClose={handleCancelDeleteProfile}>
      <DialogTitle>Delete Profile</DialogTitle>

      <DialogContent>
        <Typography variant="h6" color="red">
          Are you sure you want to delete the profile? All data will be lost as
          a result of this action, which cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelDeleteProfile}>Cancel</Button>

        <Button onClick={handleConfirmDeleteProfile} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileTitle variant="h5">
          {selectedProfile.name} Dashboard
        </ProfileTitle>

        <ProfileButtonWrapper>
          {practiceButton}
          {resultsButton}
          {editProfileButton}
          {deleteProfileButton}
        </ProfileButtonWrapper>
      </ProfileCardContent>
      {deleteProfileDialog}
    </ProfileCard>
  );
};

export default ProfileDashboard;
