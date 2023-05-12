import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ProfileButtonWrapper, ProfileButton } from "../theme";

const Timer = ({ setPracticeTime, practiceDone, practiceTime }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [timerPracticeDone, setTimerPracticeDone] = useState(0);

  useEffect(() => {
    if (practiceDone) {
      setRunning(false);
      setPracticeTime(formatTime(time));
    }
  }, [practiceDone, time, setPracticeTime, timerPracticeDone, practiceTime]);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  useEffect(() => {
    setTimerPracticeDone(time);
  }, [time]);

  const handleStart = () => setRunning(true);
  const handleStop = () => {
    setRunning(false);
    const timerPracticeDone = formatTime(time);
    setTimerPracticeDone(timerPracticeDone, () => {
      setPracticeTime(timerPracticeDone);
    });
  };

  const handleReset = () => {
    setRunning(true);
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
        <ProfileButton variant="contained" onClick={handleStart}>
          Start Timer
        </ProfileButton>
        <ProfileButton variant="contained" onClick={handleStop}>
          Stop Timer
        </ProfileButton>
        <ProfileButton variant="contained" onClick={handleReset}>
          Reset Timer
        </ProfileButton>
      </ProfileButtonWrapper>
      <Typography variant="h4" gutterBottom>
        {formatTime(time)}
      </Typography>
    </div>
  );
};

export default Timer;
