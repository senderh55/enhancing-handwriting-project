import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Grid, Paper } from "@mui/material";
//import { UserContext } from './UserContext';

const DashboardContainer = styled.div`
  margin: 2rem;
`;

const PaperContainer = styled(Paper)`
  && {
    padding: 2rem;
    text-align: center;
    color: #fff;
    background: #2196f3;
  }
`;

const ButtonContainer = styled(Button)`
  && {
    margin: 1rem;
    background: #fff;
    color: #2196f3;
  }
`;

function UserDashboard() {
  //const { user } = useContext(UserContext);

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PaperContainer>
            <h2>Welcome Sender!</h2>
            <h4>Select a Profile</h4>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ButtonContainer variant="contained">Profile 1</ButtonContainer>
              </Grid>
              <Grid item xs={4}>
                <ButtonContainer variant="contained">Profile 2</ButtonContainer>
              </Grid>
              <Grid item xs={4}>
                <ButtonContainer variant="contained">Profile 3</ButtonContainer>
              </Grid>
            </Grid>
            <ButtonContainer variant="contained">
              Create New Profile
            </ButtonContainer>
          </PaperContainer>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}

export default UserDashboard;
