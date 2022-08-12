import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";


function Input(props) {
  return (
    <Box
      component="form"
      style={{margin: "10px"}}
      sx={{
        "& > :not(style)": { width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        error={props.error}
        helperText={props.error ? props.errorMessage : ""}
        label={props.placeholder}
        type={props.type}
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
      />
      {/* <input type={props.type} placeholder={props.placeholder} required value={props.value} onChange={props.onChange}/> */}
    </Box>
  );
}

export default Input;
