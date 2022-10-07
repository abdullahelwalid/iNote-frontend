import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

function CategoriesMods() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  return (
    <div
      style={{
        alignSelf: "center",
        backgroundColor: "white",
        width: "40%",
        height: "50%",
        padding: "5%",
      }}
    >
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <input
          placeholder="Add new category"
          style={{
            width: "70%",
            height: "50%",
            alignSelf: "center",
            outline: "none",
            borderWidth: `0px 0px ${isInputFocused ? "2px" : "0px"} 0px `,
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "3px 0 10px #dbe5e5",
            paddingLeft: "10px"
          }}
          value={newCategory}
          onChange={(event) => {
            setNewCategory(event.target.value);
          }}
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
        />
        {newCategory && (
          <div>
            <IconButton>
              <AddCircleOutlinedIcon
                sx={{ fontSize: "10px", alignSelf: "center" }}
              />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

function ManageCategory() {
  const [showManager, setShowManager] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenue = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleButton = () => {
    setAnchorEl(null);
    setShowManager(true);
    setOpen(true);
  };

  const handleCloseMenue = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <ArrowDropDownCircleIcon sx={{ fontSize: "inherit" }} />
      </IconButton>
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenue}
          onClose={handleCloseMenue}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleButton}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Manage Categories</ListItemText>
          </MenuItem>
        </Menu>
        {showManager && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <CategoriesMods />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageCategory;
