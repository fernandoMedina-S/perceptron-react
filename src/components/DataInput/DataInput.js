import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";

import { connect } from "react-redux";
import { store } from "../../services/store";

const DataInput = () => {


  const submitHandler = async (event) => {
    event.preventDefault();
    const points = JSON.parse(localStorage.getItem("points"));
    const xValues = { x1: Math.random(), x2: Math.random() };

    const weights = new FormData(event.currentTarget);
    const w = { w1: weights.get("w1"), w2: weights.get("w2") };

    const generalInfo = { points, xValues, w };
    const response = await axios.post(
      "http://127.0.0.1:3030/grafica",
      generalInfo
    );
    localStorage.setItem(
      "fn",
      w.w1 + "*" + xValues.x1 + "+" + w.w2 + "*" + xValues.x2
    );
    store.dispatch({
      type: "SET_FUNCTION",
      //body: w.w1 + "*" + xValues.x1 + "+" + w.w2 + "*" + xValues.x2,
      body: w.w1 + "x" +  "+" + w.w2 + "x",
    });
  };

  return (
    <>
      <Box component="form" onSubmit={submitHandler}>
        <div className="data-input__container">
          <TextField
            name="w1"
            label="W1"
            className="data-input__textfield"
            sx={{ mb: 3 }}
          ></TextField>
          <TextField
            name="w2"
            label="W2"
            className="data-input__textfield"
            sx={{ mb: 3 }}
          ></TextField>
          <Button
            variant="contained"
            className="data-input__button"
            type="submit"
          >
            Calcular
          </Button>
        </div>
      </Box>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    lastUpdate: state.lastUpdate,
  };
};

export default connect(mapStateToProps)(DataInput);
