import React, { useEffect, useRef, useState } from "react";
import functionPlot, { FunctionPlotOptions } from "function-plot";

import { connect } from "react-redux";

const MathPlot = ({ Function }) => {
  const rootEl = useRef(null);
  const canvasEl = useRef(null);
  const contextRef = useRef(null);
  const points = [];
  const [fnP, setFnP] = useState("0");
  const [activation, setActivation] = useState(false);
  const localFunction = Function;

  const drawPoint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.fillRect(offsetX, offsetY, 10, 10);
    const newPoint = { offsetX, offsetY };
    points.push(newPoint);
    console.log(newPoint);
    localStorage.setItem("points", JSON.stringify(points));
  };

  const chancgeActive = () => {
    setActivation(()=>!activation);
  }

  useEffect(() => {
    try {

      setFnP(() => Function);
      functionPlot(
        Object.assign({}, FunctionPlotOptions, {
          target: rootEl.current,
          width: 400,
          height: 400,
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

      contextRef.current = ctx;
    } catch (e) {
      console.log(e);
    }

    return () => {
      localStorage.removeItem("fn");
    };
  }, [Function, fnP]);

  return (
    <>
      <div ref={rootEl}></div>
      <canvas
        width="400"
        height="400"
        onClick={drawPoint}
        ref={canvasEl}
        className="overlay"
      ></canvas>
      <button onClick={chancgeActive}>Activar</button>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    Function: state.Function,
  };
};

export default connect(mapStateToProps)(MathPlot);
