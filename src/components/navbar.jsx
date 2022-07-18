import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NoteIcon from "@mui/icons-material/Note";
import Divider from "@mui/material/Divider";

import { userContext } from "../contexts/context";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Navbar() {
  const { authenticated, setAuthenticated } = useContext(userContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className="nav-bar">
      <div
        style={{
          width: "50px",
          float: "left",
          display: "inline",
          paddingLeft: "15px",
          color: "#51557E",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none", float: "left" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          PaperProps={{ style: { height: "150px", background: "#D6E6F2" } }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton>
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </List>
        </Drawer>
      </div>
      <a href="/" style={{ textDecoration: "none" }}>
        <h1 className="nav-bar-logo">INOTE</h1>
      </a>
      {authenticated ? (
        <a href="" style={{ textDecoration: "none" }}>
          <h2 className="nav-bar-text">Sign out</h2>
        </a>
      ) : (
        <div>
          <a href="/login" style={{ textDecoration: "none" }}>
            <h2 className="nav-bar-text">Login</h2>
          </a>
          <a href="/sign-up" style={{ textDecoration: "none" }}>
            <h2 className="nav-bar-text">Sign up</h2>
          </a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
