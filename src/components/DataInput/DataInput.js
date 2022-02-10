import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const DataInput = () =>{
    return (
        <>
            <div className="data-input__container">
                <TextField label="W1" className="data-input__textfield"></TextField>
                <TextField label="W2" className="data-input__textfield"></TextField>
                <Button variant="contained" className="data-input__button">Calcular</Button>
            </div>
        </>
    )
}

export default DataInput;