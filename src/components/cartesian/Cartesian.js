import React, { useRef, useEffect } from "react";

const Cartesian = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const points = [];
  

  const drawPoint = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.fillRect(offsetX, offsetY, 10, 10);
    const newPoint = {offsetX, offsetY};
    points.push(newPoint);

    localStorage.setItem("points", JSON.stringify(points));
  };

  useEffect(()=>{
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 700);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(700, 350);
    ctx.stroke();
    contextRef.current = ctx;
  }, [])

  return (
    <>
      <canvas
        width="700"
        height="700"
        className="cartesian__canvas"
        onClick={drawPoint}
        ref={canvasRef}
      ></canvas>
    </>
  );
};

export default Cartesian;
