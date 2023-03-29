import React, { useEffect, useRef } from "react";
import p5 from "p5";

const TabletSketch = () => {
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);
    p5.stroke(0);
    p5.strokeWeight(4);
    p5.background(200);
  };

  const draw = (p5) => {};

  const touchMoved = (p5) => {
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    return false;
  };

  return (
    <div>
      <Sketch
        setup={setup}
        draw={draw}
        touchMoved={touchMoved}
        canvasRef={canvasRef}
      />
    </div>
  );
};

const Sketch = ({ setup, draw, touchMoved, canvasRef }) => {
  const sketchRef = useRef(null);

  const resizeCanvas = (p5) => {
    const canvas = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasRef.current);
    p5.background(255);
    return canvas;
  };

  const destroyCanvas = (p5) => {
    p5.remove();
  };

  useEffect(() => {
    const sketch = new p5((p) => {
      sketchRef.current = p;
      p.setup = () => setup(p, canvasRef.current);
      p.draw = () => draw(p);
      p.touchMoved = () => touchMoved(p);
    });

    return () => {
      destroyCanvas(sketchRef.current); // destroy canvas when unmounting component to prevent memory leaks and errors
    };
  }, [setup, draw, touchMoved, canvasRef]);

  return <div ref={canvasRef}></div>;
};

export default TabletSketch;
