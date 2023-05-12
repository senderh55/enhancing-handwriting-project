import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ResultsTable from "../components/ResultsTable";
import styled from "styled-components";
import { Typography } from "@mui/material";
const ProfileTitle = styled(Typography)``;
const Results = () => {
  const { selectedProfile, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // This useEffect is used to redirect the user to the home page if the user is not logged in.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const profileGreetings = (
    <ProfileTitle
      variant="h5"
      component="h5"
      marginBottom="1rem"
      marginTop="1rem"
    >
      {selectedProfile.name} results
    </ProfileTitle>
  );

  return (
    <>
      {profileGreetings}
      <ResultsTable profileKey={selectedProfile.key} />
    </>
  );
};

export default Results;
