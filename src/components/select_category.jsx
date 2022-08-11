import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NoteContext } from "../contexts/context";

function CategoryMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { categories, setCategories } = useContext(NoteContext);
  const [selectedCat, setSelectedCat] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div style={{ padding: "10px" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedCat? selectedCat: "Category"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: "20ch",
          },
        }}
      >
        {categories.map((category, index) => {
          return (
            <MenuItem key={index} onClick={() => {
                setSelectedCat(category.category)
                setAnchorEl(null);
            }}>
              {category.category}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default CategoryMenu;
