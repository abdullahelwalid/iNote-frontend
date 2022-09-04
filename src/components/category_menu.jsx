import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { NoteContext } from "../contexts/context";

const theme = createTheme({
  palette: {
    custom: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
});

function CategoryMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { categories } = useContext(NoteContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="outlined"
          color="custom"
          endIcon={<FilterAltOutlinedIcon />}
        >
          Category
        </Button>
      </ThemeProvider>
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
            <MenuItem key={index} onClick={handleClose}>
              {category.category}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default CategoryMenu;
