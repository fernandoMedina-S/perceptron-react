import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import ListItemText from "@mui/material/ListItemText";


import { connect } from "react-redux";
import { store } from "../../services/store";
//"http://perceptron-back.herokuapp.com/grafica"
//"http://localhost:5000/grafica"
//theme.palette.background.paper
const DataInput = ({ pointList }) => {
  const [enteredPoints, setEnteredPoints] = useState([]);
  let contador = 0;

  useEffect(() => {
    setEnteredPoints(pointList);
  }, [enteredPoints, pointList]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const points = JSON.parse(localStorage.getItem("points"));
    const locations = JSON.parse(localStorage.getItem("real_locations"));
    const xValues = { x1: Math.random(), x2: Math.random() };

    const weights = new FormData(event.currentTarget);
    const w = { w1: weights.get("w1"), w2: weights.get("w2") };

    const generalInfo = { points, xValues, w, locations };
    const response = await axios.post(
      "http://localhost:5000/grafica",
      generalInfo
    );
    console.log(generalInfo);
    const data = response.data;

    localStorage.setItem(
      "fn",
      w.w1 + "*" + xValues.x1 + "+" + w.w2 + "*" + xValues.x2
    );
    store.dispatch({
      type: "SET_FUNCTION",
      body: w.w1 + "x" + "+" + w.w2 + "x",
    });
    store.dispatch({
      type: "SET_EVALUATED",
      body: data,
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
          <TextField
            name="theta"
            label="Θ"
            className="data-input__textfield"
            defaultValue="1"
            sx={{ mb: 3 }}
          ></TextField>
          <Button
            variant="contained"
            className="data-input__button"
            type="submit"
            sx={{ mb: 3 }}
          >
            Calcular
          </Button>

          <List
            sx={{
              overflow: "auto",
              maxHeight: 150,
            }}
          >
            {enteredPoints.map((element) => {
              contador = contador + 1;
              return (
                <ListItem>
                  <ListItemIcon>
                    <Brightness1Icon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Punto " + contador}
                    secondary={
                      "X: " +
                      element.offsetX.toFixed(2) +
                      "   Y: " +
                      element.offsetY.toFixed(2)
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Box>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    pointList: state.enteredPoints,
    lastUpdate: state.lastUpdate,
  };
};

export default connect(mapStateToProps)(DataInput);
