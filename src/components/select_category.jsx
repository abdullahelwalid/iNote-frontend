import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NoteContext, userContext, selectedCategoryContext } from "../contexts/context";
import { TextField } from "@mui/material";
import axios from "axios";

function CategoryMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { categories, setCategories } = useContext(NoteContext);
  const {category, setCategory} = useContext(selectedCategoryContext)
  const { URL, token, userId, setAuthenticated } = useContext(userContext);
  const [showCategory, setShowCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = () => {
    if (showCategory && newCategory && newCategory.length < 25) {
      console.log("newcat");
      axios
        .post(
          `${URL}/category`,
          {
            user_id: userId,
            category: newCategory,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((resp) => {
          setNewCategory("");
          setShowCategory(false);
          setCategories((cats) => [...cats, resp.data]);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            return setAuthenticated(false);
          }
        });
    }
    setShowCategory(!showCategory);
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
        {category ? category.category : "Category"}
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
        <MenuItem
              onClick={() => {
                setCategory(null);
                setAnchorEl(null);
              }}
            >
              None
            </MenuItem>
        {categories.map((category) => {
          return (
            <MenuItem
              key={category.id}
              onClick={() => {
                setCategory(category);
                setAnchorEl(null);
              }}
            >
              {category.category}
            </MenuItem>
          );
        })}
        <MenuItem>
          <Button
            id="basic-button"
            aria-haspopup="true"
            onClick={handleCategory}
            variant="text"
            style={{ fontSize: "10px", margin: "auto" }}
            endIcon={<AddIcon />}
          >
            add category
          </Button>
        </MenuItem>
        {showCategory && (
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            size="small"
            onChange={(event) => {
              if (event.target.value.length <= 25) {
                setNewCategory(event.target.value);
              }
            }}
            value={newCategory}
            sx={{ width: "60%" }}
          />
        )}
      </Menu>
    </div>
  );
}

export default CategoryMenu;
