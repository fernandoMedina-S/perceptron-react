import React, { useEffect, useRef } from "react";
import functionPlot, { FunctionPlotOptions } from "function-plot";

const MathPlot = () => {
  const rootEl = useRef(null);
  const canvasEl = useRef(null);
  const contextRef = useRef(null);
  const points = [];

  const drawPoint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.fillRect(offsetX, offsetY, 1, 1);
    const newPoint = { offsetX, offsetY };
    points.push(newPoint);
    console.log(newPoint);
    localStorage.setItem("points", JSON.stringify(points));
  };

  useEffect(() => {
    try {
      functionPlot(
        Object.assign({}, FunctionPlotOptions, {
          target: rootEl.current,
          width: 750,
          height: 750,
          grid: true,
          disableZoom: true,
          yAxis: { domain: [-30, 30] },
          xAxis: { domain: [-30, 30] },
          data: [
            {
              fn: "x^2-3",
            },
          ],
        })
      );
      const canvasObj = canvasEl.current;
      const ctx = canvasObj.getContext("2d");
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      
      contextRef.current = ctx;
    } catch (e) {
        console.log(e);
    }
  });

  return (
    <>
      <div ref={rootEl}></div>
      <canvas onClick={drawPoint} ref={canvasEl} className="overlay"></canvas>
    </>
  );
};

export default MathPlot;
