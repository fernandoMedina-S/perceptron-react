import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import axios from "axios";

const DataInput = () =>{

    

    const submitHandler = async (event) =>{
        event.preventDefault();
        const points = JSON.parse(localStorage.getItem("points"));

        const response = await axios.post("http://127.0.0.1:3030/grafica", points);
        console.log(response);
        
    }

    return (
        <>
        <Box component="form" onSubmit={submitHandler}>
            <div className="data-input__container">
                <TextField label="W1" className="data-input__textfield" sx={{ mb:3 }}></TextField>
                <TextField label="W2" className="data-input__textfield" sx={{ mb:3 }}></TextField>
                <Button variant="contained" className="data-input__button" type="submit">Calcular</Button>
            </div>
        </Box>
        </>
    )
}

export default DataInput;