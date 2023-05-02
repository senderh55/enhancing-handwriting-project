import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useContext } from "react";

import { AuthContext } from "../context/authContext";

import { useNavigate } from "react-router-dom";

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

import { ProfileButtonWrapper, ProfileButton } from "../theme";
import Logo from "../components/Logo";
import Snackbar from "@mui/material/Snackbar";
const StyledSnackbar = styled(Snackbar)`
  && {
    width: 50%; /* change the width as needed */
    margin: auto; /* center the Snackbar horizontally */
    top: 90%; /* center the Snackbar vertically */
    transform: translateY(-50%);

    @media (max-width: 600px) {
      width: 100%; /* adjust the width for smaller screens */
    }
  }
`;

const ProfileCard = styled(Card)``;

const ProfileCardContent = styled(CardContent)``;

const ProfileTitle = styled(Typography)``;

const ProfileDashboard = () => {
  const { selectedProfile, isLoggedIn, setIsEditingProfile, deleteProfile } =
    useContext(AuthContext);

  const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    try {
      await deleteProfile(); // we use await to prevent the user from being redirected before the deleteProfile function has finished executing
      setConfirmDeleteMsg(false);
      navigate("/");
    } catch (err) {
      setSnackbarOpen(true);
      console.log(err);
    }
  };

  const practiceButton = (
    <ProfileButton onClick={() => navigate("/practice")}>
      Practice
    </ProfileButton>
  );
  const resultsButton = (
    <ProfileButton onClick={() => navigate("/results")}>Results</ProfileButton>
  );

  const editProfileButton = (
    <ProfileButton onClick={handleEditProfileButtonClick} variant="contained">
      Edit profile
    </ProfileButton>
  );

  const backToUserDashboardButton = (
    <Button
      onClick={() => navigate("/userdashboard")}
      variant="contained"
      sx={{ marginLeft: "10px", marginTop: "70px", marginBottom: "10px" }}
      color="success"
    >
      Back to User Dashboard
    </Button>
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

  const ProfileButtons = (
    <ProfileCard style={{ marginTop: "10px" }}>
      <ProfileCardContent>
        <ProfileTitle variant="h5">
          {selectedProfile.name} Dashboard
        </ProfileTitle>

        <ProfileButtonWrapper style={{ marginTop: "10px" }}>
          {practiceButton}
          {resultsButton}
          {editProfileButton}
          {deleteProfileButton}
        </ProfileButtonWrapper>
      </ProfileCardContent>
      {deleteProfileDialog}
      {backToUserDashboardButton}
    </ProfileCard>
  );

  return (
    <>
      {ProfileButtons}
      <Logo />
      <StyledSnackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={"An error occurred. Please try again later."}
      />
    </>
  );
};

export default ProfileDashboard;
