import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ResultsTable from "../components/ResultsTable";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { StyledButton, StyledButtonWrapper } from "../theme";

const ProfileTitle = styled(Typography)``;
const Results = () => {
  const { selectedProfile, isLoggedIn } = useContext(AuthContext);

  const [practiceData, setPracticeData] = useState([]);

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

  const saveResultsInCSV = () => {
    // Remove the last column from each object in the practiceData array
    const modifiedPracticeData = practiceData.map((obj) => {
      const modifiedObj = { ...obj };
      console.log(modifiedObj, obj);
      delete modifiedObj["_id"]; // Replace 'lastColumn' with the actual key of the last column to remove
      return modifiedObj;
    });
    // Extract the keys of the first object to use as column names
    const keys = Object.keys(modifiedPracticeData[0]);

    // Create an array of arrays containing the column names and values
    const rows = [
      keys,
      ...modifiedPracticeData.map((obj) => Object.values(obj)),
    ];

    // Create a CSV string using Papa.unparse
    const csvData = Papa.unparse(rows);

    // Create a Blob with the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    // Save the Blob as a CSV file
    saveAs(blob, `practiceResults-${selectedProfile.name}.csv`);
  };

  const saveResults = (
    <StyledButtonWrapper>
      <StyledButton
        variant="contained"
        onClick={() => saveResultsInCSV()}
        color="secondary"
        style={{
          fontSize: "1.5rem",
          padding: "10px 60px",
        }}
      >
        Save Results
      </StyledButton>
    </StyledButtonWrapper>
  );

  return (
    <>
      {profileGreetings}
      <ResultsTable
        profileKey={selectedProfile.key}
        setPracticeData={setPracticeData}
        practiceData={practiceData}
      />
      {saveResults}
    </>
  );
};

export default Results;
