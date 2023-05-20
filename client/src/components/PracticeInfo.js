import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

const InfoContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const InfoTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`;

const ParameterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ParameterName = styled(Typography)`
  font-weight: bold;
  margin-right: 8px;
  margin-top: 8px;
`;

const ParameterValue = styled(Typography)``;

const PracticeInfo = ({ startingLine, maxDistance }) => {
  const [startingLineValue, setStartingLineValue] = useState(startingLine + 1);
  const [maxDistanceValue, setMaxDistanceValue] = useState(maxDistance);

  useEffect(() => {
    setStartingLineValue(startingLine + 1);
  }, [startingLine]);

  useEffect(() => {
    setMaxDistanceValue(maxDistance);
  }, [maxDistance]);

  return (
    <InfoContainer>
      <InfoTitle variant="h6">Practice Parameters</InfoTitle>
      <ParameterContainer>
        <ParameterName variant="subtitle1">Starting Line:</ParameterName>
        <ParameterValue variant="subtitle1">{startingLineValue}</ParameterValue>
      </ParameterContainer>
      <ParameterContainer>
        <ParameterName variant="subtitle1">Max Distance:</ParameterName>
        <ParameterValue variant="subtitle1">{maxDistanceValue}</ParameterValue>
      </ParameterContainer>
    </InfoContainer>
  );
};

export default PracticeInfo;
