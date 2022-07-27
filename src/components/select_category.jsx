import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectCategory() {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl  className="select-category" size="small" sx={{ m: 1, minWidth: 110}}>
      <InputLabel sx={{fontSize: "10px"}} id="demo-simple-select-autowidth-label">Category</InputLabel>
      <Select
      sx={{fontSize: "10px"}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        onChange={handleChange}
        autoWidth
        label="Category"
      >
        <MenuItem value="">
          <em style={{fontSize: "10px"}}>None</em>
        </MenuItem>
        <MenuItem value={10} sx={{fontSize: "10px"}}>Twenty</MenuItem>
        <MenuItem value={21} sx={{fontSize: "10px"}}>Twenty one</MenuItem>
        <MenuItem value={22} sx={{fontSize: "10px"}}>Twenty one and a half</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectCategory;
