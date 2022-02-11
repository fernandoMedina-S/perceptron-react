import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";

const DataInput = () =>{

    const submitHandler = (event) =>{
        event.preventDefault();
        const points = JSON.parse(localStorage.getItem("points"));
        console.log(points);
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