import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import p5 from "p5";
import * as api from "../utils/api";
import Timer from "./../components/Timer";
import PracticeInputForm from "./../components/PracticeInputForm";
import PracticeInfo from "./../components/PracticeInfo";
import { PracticeButtonWrapper } from "../theme";
import { AuthContext } from "../context/authContext";
import distanceErrorSoundFile from "../assets/audio/distanceError.mp3";
import lineDeviationSoundFile from "../assets/audio/lineDeviation.wav";
import saveAs from "file-saver";
import sameLineDeviationFile from "../assets/audio/sameLineDeviation.mp3";
import {
  ProfileButton,
  StyledButton,
  StyledButtonWrapper,
  StyledSnackbar,
} from "../theme";

import { useNavigate } from "react-router-dom";

const TabletSketch = () => {
  const canvasRef = useRef(null);

  const [clear, setClear] = useState(false);
  const { selectedProfile } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [maxDistance, setMaxDistance] = useState(100);
  const [startingLine, setStartingLine] = useState(0);
  const [practiceTime, setPracticeTime] = useState(`00:00`);
  const [practiceDone, setPracticeDone] = useState(false); // add a state to keep track if the practice is done or not
  const rowHeight = 30.236; // 0.8 cm ≈ 30.236 px
  const rowsYPositions = []; // array to keep track of the y positions of the rows
  // Wrap the initialization of positionData in a useMemo hook
  const positionData = useMemo(() => ({}), []);
  // define canvas size in inches according to the size of the wacom intuos pro medium size tablet (8.82 x 5.83 inches)
  //changed from the setup to global
  const canvasWidth = 8.82 * 96;
  const canvasHeight = 5.83 * 96;

  let lastTouchMovedTimeRef = useRef(null);
  // add a ref to previousMousePosition - x and y coordinates
  // set the initial value to the top right side of the canvas (hebrew text)
  let previousMouseXPositionRef = useRef(0); // FIXME: need to change this to be dynamic according to the canvas size (width) intigrate with hebrew organization
  let previousMouseYPositionRef = useRef(0);
  let validDrawing = useRef(true); // add a ref to keep track of the validity of the drawing
  let lineDeviationErrors = useRef(0); // add a ref to keep track of the line deviation
  let distanceDeviationErrors = useRef(0); // add a ref to keep track of the distance deviation
  let wrongLineErrors = useRef(0); // add a ref to keep track of the wrong line errors

  // IMPORTENT NOTE: p5.sound is not supported in this stracture, so we using the HTML5 Audio API and useref to keep track of the sound
  let distanceErrorSound = useRef(null); // add a ref to keep track of the distance error sound
  let lineDeviationSound = useRef(null); // add a ref to keep track of the line deviation sound
  let lineSameDeviationSound = useRef(null); // add a ref to keep track of the line deviation sound

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.stroke(0);
    p5.background(225);
    p5.strokeWeight(1);
    // draw rows of 30.236px gap (as regular notebook) between each other to create a paper for the user to draw on top of it
    for (let i = startingLine; i < canvasHeight; i += rowHeight) {
      p5.line(startingLine, i, canvasWidth, i);
      console.log(i);
      rowsYPositions.push(i);
    }
    p5.strokeWeight(3);
    // load the distance error sound
    distanceErrorSound.current = new Audio(distanceErrorSoundFile);
    lineDeviationSound.current = new Audio(lineDeviationSoundFile);
    lineSameDeviationSound.current = new Audio(sameLineDeviationFile);
  };

  const draw = (p5) => {};

  // function that checks the time since the last touchMoved call and logs it
  const checkTimeSinceLastTouchMoved = (p5) => {
    let timePassed = false;
    // get the current time
    const currentTime = new Date().getTime();
    // check if the lastTouchMovedTime is null
    if (lastTouchMovedTimeRef === null) {
      // if it is null, set the lastTouchMovedTime to the current time
      lastTouchMovedTimeRef.current = currentTime;
    } else {
      // if it is not null, calculate the time difference between the current time and the lastTouchMovedTime
      const timeDifference = lastTouchMovedTimeRef.current
        ? currentTime - lastTouchMovedTimeRef.current
        : 0;

      // check if the time difference is greater than the max gap
      if (timeDifference > maxDistance) {
        // if it is greater than the max gap, log the time difference
        console.log(timeDifference + "ms passed since last write");
        timePassed = true;
      }
      // set the lastTouchMovedTime to the current time

      lastTouchMovedTimeRef.current = currentTime;
    }

    return timePassed;
  };

  const checkDistanceBetweenPoints = (p5) => {
    // get the current mouse position
    const currentMousePosition = {
      x: p5.mouseX,
      y: p5.mouseY,
    };

    // calculate the distance between the current and previous mouse position
    const wrongLinedistance = () => {
      if (!inCanvas(p5)) {
        return false;
      } else
        return (
          Math.floor(currentMousePosition.y / rowHeight) !==
          Math.floor(previousMouseYPositionRef.current / rowHeight)
        );
    };

    // calculate the X distance between the current and previous mouse position
    const sameLineDist = p5.dist(
      currentMousePosition.x,
      0,
      previousMouseXPositionRef.current,
      0
    );
    //check if the writing arrived to the end of the line and start on the next one.
    const endLineCheck = () => {
      return (
        previousMouseXPositionRef.current > 0 &&
        previousMouseXPositionRef.current <= 35 &&
        currentMousePosition.y > previousMouseYPositionRef.current &&
        currentMousePosition.x < canvasWidth &&
        currentMousePosition.x > canvasWidth - 35
      );
    };

    //Check if the writing line is equal or grater to starting line
    if (startingLine * rowHeight >= previousMouseYPositionRef.current) {
      p5.fill(255, 0, 255);
      p5.triangle(30, 75, 58, 20, 86, 75);
      distanceErrorSound.current.play(); // play the distance error sound
    } //Check if the user start writing on the next line before reaching to the end of the line.
    else if (wrongLinedistance() && !endLineCheck()) {
      p5.fill(0, 0, 255);
      p5.circle(currentMousePosition.x, currentMousePosition.y, 10);
      lineSameDeviationSound.current.play(); // play the distance error sound
      wrongLineErrors.current++;
    }
    // check if the distance is greater than maxDistance
    else if (sameLineDist > maxDistance && inCanvas(p5) && !endLineCheck()) {
      // if it is greater than 100px, log the distance
      // draw red circle as a visual indicator of error and fill it with red color
      p5.fill(255, 0, 0);
      p5.circle(currentMousePosition.x, currentMousePosition.y, 10);
      //validDrawing.current = false; // set the validDrawing to false FiXXCCCCcCCCGGGgshshshsjsj
      lineDeviationSound.current.play(); // play the distance error sound
      distanceDeviationErrors.current++;
    }

    validDrawing.current = true;
  };

  //Check if the mouse in the Canvas borders
  const inCanvas = (p5) => {
    return (
      p5.mouseX >= 0 &&
      p5.mouseY >= 0 &&
      p5.mouseX < canvasWidth &&
      p5.mouseY < canvasHeight
    );
  };

  //set the previousMousePosition to the current mouse position while it in the Canvas
  const saveMousePosition = (p5) => {
    if (inCanvas(p5)) {
      previousMouseXPositionRef.current = p5.mouseX;
      previousMouseYPositionRef.current = p5.mouseY;
    }
  };

  // check if current drawing not overlaping the x points of the rows from rowsYPositions array
  const lineDeviationCheck = (p5) => {
    // function that checks if the current mouse position is not overlaping the x points of the rows from rowsYPositions array with a deviation of
    const containsNumberWithDeviation = (arr, num, deviation) => {
      return arr.some(function (element) {
        return Math.abs(element - num) <= deviation;
      });
    };

    // Get the current mouse position
    const currentMousePosition = {
      x: p5.mouseX,
      y: p5.mouseY,
    };

    // check if the current mouse position is not overlaping the x points of the rows from rowsYPositions array
    if (
      containsNumberWithDeviation(rowsYPositions, currentMousePosition.y, 0.5)
    ) {
      // if it is overlaping, draw a big green rectangle as a visual indicator of error and fill it with green color
      p5.fill(0, 255, 0);
      // create a rectangle with the size of 10px x 10px in the current X,Y mouse position
      p5.rect(currentMousePosition.x, currentMousePosition.y, 10, 10);
      lineDeviationSound.current.play(); // play the line deviation sound
      lineDeviationErrors.current++; // increment the lineDeviationErrors counter
    }
  };

  const touchMoved = (p5) => {
    saveTimeStamp(p5, getCurrentTime());
    lineDeviationCheck(p5); // call the lineDeviationCheck function to check if the current drawing not overlapping the x points of the rows from rowsYPositions array
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY); // draw a line between the previous and current mouse position

    // call the checkTimeSinceLastTouchMoved function
    let timePassed = checkTimeSinceLastTouchMoved(p5);

    if (timePassed) {
      // if the time passed is greater than 300 ms, call the checkDistanceBetweenPoints function
      checkDistanceBetweenPoints(p5);
    }

    if (validDrawing.current) {
      saveMousePosition(p5); // Pass the current time to the saveMousePosition function
    }

    // prevent default
    return false;
  };

  // Function to get the current time in the format "hours:min"
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Function to save the mouse position along with the current time
  const saveTimeStamp = (p5, currentTime) => {
    // get the current mouse position with the format "x:y" and only two decimal points
    const position = `x:${p5.mouseX.toFixed(2)},y:${p5.mouseY.toFixed(2)}`;
    positionData[currentTime] = position;
  };

  const clearSketch = () => {
    setClear(true);
    // clear time difference between each touchMoved call
    lastTouchMovedTimeRef.current = null;
    // clear previous mouse position
    previousMouseXPositionRef.current = null;
    previousMouseYPositionRef.current = null;
    lineDeviationErrors.current = 0;
    distanceDeviationErrors.current = 0;
    wrongLineErrors.current = 0;
    // set validDrawing to true
    //validDrawing.current = true;
  };

  useEffect(() => {
    setClear(false);
  }, [clear]);

  // save sketch to user's computer as a png file with the current date and time as the file name without p5.saveCanvas() function
  // because p5.saveCanvas() function is not supported in this stracture
  // toDataURL() function is used to convert the canvas to a data url and then a link is created to download the image with profile name and current date and time as the file name
  const saveSketch = () => {
    const canvas = document.getElementById("defaultCanvas0");
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    // get the current date and time and use it as the file name
    let dateString = new Date().toLocaleString().split(",")[0]; // get the date without the time part
    let fileName = `${selectedProfile.name} Handwriting pratice ${dateString}.png`;
    link.download = fileName;
    link.href = img;
    link.click();
  };

  const navigate = useNavigate();
  useEffect(() => {
    const sendResults = async () => {
      // set the practiceDone to true, To stop the timer, among other things
      let lineDeviationErrorsConuter = lineDeviationErrors.current;
      let distanceDeviationErrorsCounter = distanceDeviationErrors.current;
      let wrongLineErrorsCounter = wrongLineErrors.current;
      const practiceData = {
        practiceTime,
        maxDistance,
        lineDeviationErrorsConuter,
        wrongLineErrorsCounter,
        distanceDeviationErrorsCounter,
      };

      // set the practice time to the current time
      try {
        await api.sendPracticeData(selectedProfile.key, practiceData);
        navigate("/results");
        // Save positionData as a text file
        const fileContents = JSON.stringify(positionData);
        const blob = new Blob([fileContents], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(
          blob,
          `positionAndTimeData-${selectedProfile.name}-${
            new Date().toLocaleString().split(",")[0]
          }.txt`
        );
      } catch (error) {
        console.log(error);
        setSnackbarOpen(true);
      }
    };

    // Call the sendResults function only when the practiceDone state changes to true.
    if (practiceDone && practiceTime !== "00:00") {
      sendResults();
    }
  }, [
    practiceDone,
    practiceTime,
    maxDistance,
    selectedProfile,
    navigate,
    positionData,
  ]);

  const clearSketchButton = (
    <ProfileButton variant="contained" onClick={clearSketch}>
      Clear Sketch
    </ProfileButton>
  );

  const saveSketchButton = (
    <ProfileButton variant="contained" onClick={() => saveSketch()}>
      Save Sketch
    </ProfileButton>
  );

  const conntectionErrorAlert = (
    <StyledSnackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      message={"An error occurred. Please try again later."}
    />
  );

  const donePracticeButton = (
    <StyledButtonWrapper>
      <StyledButton
        variant="contained"
        onClick={() => setPracticeDone(true)}
        color="secondary"
        style={{
          fontSize: "1.5rem",
          padding: "10px 60px",
        }}
      >
        Done practice
      </StyledButton>
    </StyledButtonWrapper>
  );

  const inputForm = (
    <PracticeInputForm
      setMaxDistance={setMaxDistance}
      setStartingLine={setStartingLine}
    />
  );
  const sketch = (
    <Sketch
      setup={setup}
      draw={draw}
      touchMoved={touchMoved}
      canvasRef={canvasRef}
      clear={clear}
    />
  );

  return (
    <>
      <PracticeButtonWrapper>
        {clearSketchButton}
        {saveSketchButton}
      </PracticeButtonWrapper>
      <PracticeButtonWrapper>
        {inputForm}
        {sketch}
        <PracticeInfo maxDistance={maxDistance} startingLine={startingLine} />
      </PracticeButtonWrapper>

      <Timer setPracticeTime={setPracticeTime} practiceDone={practiceDone} />
      {donePracticeButton}
      {conntectionErrorAlert}
    </>
  );
};

// react.memo is used to prevent the component from re-rendering when the props are the same
const Sketch = React.memo(({ setup, draw, touchMoved, canvasRef, clear }) => {
  const sketchRef = useRef(null);

  const destroyCanvas = (p5) => {
    p5.remove();
  };

  useEffect(() => {
    new p5((p) => {
      sketchRef.current = p;

      p.setup = () => setup(p, canvasRef.current);
      p.draw = () => draw(p);
      p.touchMoved = () => touchMoved(p);
    });

    return () => {
      destroyCanvas(sketchRef.current);
    };
  }, [setup, draw, touchMoved, canvasRef]);

  useEffect(() => {
    if (clear) {
      sketchRef.current.clear();
    }
  }, [sketchRef, clear]);

  return (
    <div
      ref={canvasRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
});

export default TabletSketch;
