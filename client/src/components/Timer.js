import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { ProfileButtonWrapper } from "../theme";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <ProfileButtonWrapper>
        <Button variant="contained" onClick={handleStart}>
          Start Timer
        </Button>
        <Button variant="contained" onClick={handleStop}>
          Stop Timer
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset Timer
        </Button>
      </ProfileButtonWrapper>
      <Typography variant="h4" gutterBottom>
        {formatTime(time)}
      </Typography>
    </div>
  );
};

export default Timer;
