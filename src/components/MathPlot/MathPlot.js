import React, { useEffect, useRef, useState } from "react";
import functionPlot, { FunctionPlotOptions } from "function-plot";

import { connect } from "react-redux";

const MathPlot = ({ Function, evaluated }) => {
  const rootEl = useRef(null);
  const canvasEl = useRef(null);
  const contextRef = useRef(null);
  const points = [];
  const [fnP, setFnP] = useState("0");
  const real_locations = []

  const drawPoint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.arc(offsetX, offsetY, 2, 0, 2 * Math.PI, true);
    contextRef.current.fill();
    const newPoint = {
      offsetX: parseFloat(offsetX / 6) - 30,
      offsetY: -1 * (parseFloat(offsetY / 6) - 30),
    };
    const realLocation = {
      offsetX,
      offsetY
    }
    points.push(newPoint);
    console.log(newPoint);
    real_locations.push(realLocation);
    localStorage.setItem("points", JSON.stringify(points));
    localStorage.setItem("real_locations", JSON.stringify(real_locations));
  };

  const reDrawPoint = () => {
    for (const element in evaluated) {
      contextRef.current.fillStyle = evaluated[element].distancia >= 0 ? "#41e109" : " #e12709";
      contextRef.current.beginPath();
      contextRef.current.arc(evaluated[element].ubicaciones[element].offsetX, evaluated[element].ubicaciones[element].offsetY, 2, 0, 2 * Math.PI, true);
      contextRef.current.fill();
    }
  };

  useEffect(() => {
    try {
      setFnP(() => Function);
      functionPlot(
        Object.assign({}, FunctionPlotOptions, {
          target: rootEl.current,
          width: 419,
          height: 399,
          grid: true,
          disableZoom: true,
          yAxis: { domain: [-30, 30] },
          xAxis: { domain: [-30, 30] },
          data: [
            {
              fn: fnP,
            },
          ],
        })
      );
      const canvasObj = canvasEl.current;
      const ctx = canvasObj.getContext("2d");
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;

      reDrawPoint();

      contextRef.current = ctx;
    } catch (e) {
      console.log(e);
    }

    return () => {
      localStorage.removeItem("fn");
    };
  }, [Function, fnP, evaluated]);

  return (
    <>
      <div ref={rootEl}></div>
      <canvas
        width="360"
        height="360"
        onClick={drawPoint}
        ref={canvasEl}
        className="overlay"
      ></canvas>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    Function: state.Function,
    evaluated: state.evaluatedPoint,
  };
};

export default connect(mapStateToProps)(MathPlot);
