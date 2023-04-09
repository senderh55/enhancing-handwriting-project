import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
    deleteUser,
  } = useContext(AuthContext);
  const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(false);

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

  const handleCancelDeleteUser = () => {
    setConfirmDeleteMsg(false);
  };

  const handleConfirmDeleteUser = async () => {
    await deleteUser(); // we use await to prevent the user from being redirected before the deleteProfile function has finished executing
    setConfirmDeleteMsg(false);
    navigate("/");
  };

  const handleDeleteUserButtonClick = () => {
    setConfirmDeleteMsg(true);
  };

  const changePasswordButton = (
    <ProfileButton
      onClick={() => navigate("/changePassword")}
      variant="contained"
    >
      Change Password
    </ProfileButton>
  );

  const addProfileButton = (
    <ProfileButton
      onClick={handleCreateProfileButtonClick}
      variant="contained"
      // make the button in the left side of the screen and green
      sx={{ marginRight: "auto" }}
      color="success"
    >
      Add Profile
    </ProfileButton>
  );

  // create RED color button for delete user account button and will be in the other side of the screen
  const deleteUserAccountButton = (
    <ProfileButton
      onClick={handleDeleteUserButtonClick}
      variant="contained"
      // make the button in the right side of the screen
      sx={{ marginLeft: "auto" }}
      // make the color red
      color="error"
    >
      Delete User Account
    </ProfileButton>
  );

  const deleteUserDialog = (
    <Dialog open={confirmDeleteMsg} onClose={handleCancelDeleteUser}>
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <Typography variant="h6" color="red">
          Are you sure you want to delete the User? All data will be lost as a
          result of this action, which cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelDeleteUser}>Cancel</Button>

        <Button onClick={handleConfirmDeleteUser} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

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
        {addProfileButton}
        {changePasswordButton}
        {deleteUserAccountButton}
      </CardActions>
      {deleteUserDialog}
    </ProfileCard>
  );
};

export default UserDashboard;
