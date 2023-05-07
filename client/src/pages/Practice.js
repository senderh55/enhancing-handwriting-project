import React, { useEffect, useRef, useState, useContext } from "react";
import p5 from "p5";

import { Button } from "@mui/material";
import Timer from "./../components/Timer";
import PracticeInputForm from "./../components/PracticeInputForm";

import { PracticeButtonWrapper } from "../theme";
import { AuthContext } from "../context/authContext";
import distanceErrorSoundFile from "../assets/audio/distanceError.mp3";
import lineDeviationSoundFile from "../assets/audio/lineDeviation.wav";

import sameLineDeviationFile from "../assets/audio/sameLineDeviation.mp3";

import { ProfileButton } from "../theme";
import styled from "styled-components";

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin: 5px;
  &:first-of-type {
    margin-right: 5px;
  }
  font-size: 1.5rem;
  padding: 10px 20px;
`;

const TabletSketch = () => {
  const canvasRef = useRef(null);
  const maxTimeDifference = 500; // 500 milliseconds (ms) between each touchMoved call - user draws on the canvas

  const [clear, setClear] = useState(false);
  const { selectedProfile } = useContext(AuthContext);
  const [maxDistance, setMaxDistance] = useState(100);
  const [startingLine, setStartingLine] = useState(0);

  const rowHeight = 30.236; // 0.8 cm ≈ 30.236 px
  const rowsYPositions = []; // array to keep track of the y positions of the rows

  // define canvas size in inches according to the size of the wacom intuos pro medium size tablet (8.82 x 5.83 inches)
  //changed from the setup to global
  const canvasWidth = 8.82 * 96;
  const canvasHeight = 5.83 * 96;

  let lastTouchMovedTimeRef = useRef(null);
  // add a ref to previousMousePosition - x and y coordinates
  // set the initial value to the top right side of the canvas (hebrew text)
  let previousMouseXPositionRef = useRef(800); // FIXME: need to change this to be dynamic according to the canvas size (width) intigrate with hebrew organization
  let previousMouseYPositionRef = useRef(30);
  let validDrawing = useRef(true); // add a ref to keep track of the validity of the drawing

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
      if (timeDifference > maxTimeDifference) {
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

    // calculate the distance between the current and previous mouse position ///idan
    const wrongLinedistance = () => {
      if (!inCanvas(p5)) {
        return false;
      } else
        return (
          Math.floor(currentMousePosition.y / rowHeight) !==
          Math.floor(previousMouseYPositionRef.current / rowHeight)
        );
    };

    console.log(currentMousePosition.x + "\n");
    console.log(currentMousePosition.y + "\n");

    // idan change
    const sameLineDist = p5.dist(
      currentMousePosition.x,
      0,
      previousMouseXPositionRef.current,
      0
    );

    //idan change
    if (wrongLinedistance()) {
      p5.fill(0, 0, 255);
      p5.circle(currentMousePosition.x, currentMousePosition.y, 10);
      //validDrawing.current = false; // set the validDrawing to false FiXXCCCCcCCCGGGgshshshsjsj
      lineSameDeviationSound.current.play(); // play the distance error sound
    }
    // check if the distance is greater than maxDistance
    else if (sameLineDist > maxDistance && inCanvas(p5)) {
      // if it is greater than 100px, log the distance
      // draw red circle as a visual indicator of error and fill it with red color
      p5.fill(255, 0, 0);
      p5.circle(currentMousePosition.x, currentMousePosition.y, 10);
      //validDrawing.current = false; // set the validDrawing to false FiXXCCCCcCCCGGGgshshshsjsj
      lineDeviationSound.current.play(); // play the distance error sound
    }

    validDrawing.current = true;
  };

  //idan change
  const inCanvas = (p5) => {
    return (
      p5.mouseX >= 0 &&
      p5.mouseY >= 0 &&
      p5.mouseX < canvasWidth &&
      p5.mouseY < canvasHeight
    );
  };

  //idan change
  const saveMousePosition = (p5) => {
    // set the previousMousePosition to the current mouse position
    if (inCanvas(p5)) {
      console.log("!!!");
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

    // get the current mouse position
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
    }
  };

  const touchMoved = (p5) => {
    console.log(startingLine, maxDistance);
    lineDeviationCheck(p5); // call the lineDeviationCheck function to check if the current drawing not overlaping the x points of the rows from rowsYPositions array
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY); // draw a line between the previous and current mouse position

    // call the checkTimeSinceLastTouchMoved function
    let timePassed = checkTimeSinceLastTouchMoved(p5);

    if (timePassed) {
      // if the time passed is greater than 300 ms, call the checkDistanceBetweenPoints function
      checkDistanceBetweenPoints(p5);
    }
    if (validDrawing.current) saveMousePosition(p5);
    // prevent default
    return false;
  };

  const clearSketch = () => {
    setClear(true);
    // clear time difference between each touchMoved call
    lastTouchMovedTimeRef.current = null;
    // clear previous mouse position
    previousMouseXPositionRef.current = null;
    previousMouseYPositionRef.current = null;
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

  const donePracticeButton = (
    <StyledButtonWrapper>
      <StyledButton
        variant="contained"
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

  return (
    <>
      <PracticeButtonWrapper>
        {clearSketchButton}
        {saveSketchButton}
      </PracticeButtonWrapper>
      <PracticeButtonWrapper>
        <PracticeInputForm
          setMaxDistance={setMaxDistance}
          setStartingLine={setStartingLine}
        />
        <Sketch
          setup={setup}
          draw={draw}
          touchMoved={touchMoved}
          canvasRef={canvasRef}
          clear={clear}
        />
      </PracticeButtonWrapper>

      <Timer />
      {donePracticeButton}
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
