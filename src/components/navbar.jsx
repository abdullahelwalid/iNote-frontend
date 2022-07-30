import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Drawer from "./drawer";

import { userContext } from "../contexts/context";



function Navbar() {
  const navigate = useNavigate();
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
      {authenticated && (
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
            isOpen={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <IconButton onClick={handleDrawerClose} sx={{ marginLeft: "80%" }}>
              <ChevronLeftIcon />
            </IconButton>
            <Divider />
          </Drawer>
        </div>
      )}

      <h1
        className="nav-bar-logo"
        onClick={() => {
          navigate("/");
        }}
      >
        iNOTE
      </h1>
      {authenticated ? (
        <a href="/login" style={{ textDecoration: "none" }}>
          <h2
            className="nav-bar-text"
            onClick={() => {
              localStorage.clear();
              setAuthenticated(false);
            }}
          >
            Sign out
          </h2>
        </a>
      ) : (
        <div>
          <a href="/login" style={{ textDecoration: "none" }}>
            <h2
              className="nav-bar-text"
              onClick={() => {
                localStorage.clear();
                setAuthenticated(false);
              }}
            >
              Login
            </h2>
          </a>

          <a href="/sign-up" style={{ textDecoration: "none" }}>
            <h2
              className="nav-bar-text"
              onClick={() => {
                localStorage.clear();
                setAuthenticated(false);
              }}
            >
              Sign up
            </h2>
          </a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
