import React from "react";
import Input from "./input";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";


function Signup() {
  return (
    <div style={{marginBottom: "20px"}}>
      <h1 className="title">Sign up</h1>
      <Divider/>
      <form className="form container">
        <Input type="text" placeholder="First name" />
        <Input type="text" placeholder="Last name" />
        <Input type="email" placeholder="Email" />
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>

      <p style={{ fontSize: "16px", paddingBottom: "10px" }}>
        You have an account?
      </p>
      <Link to="/login">
        <button variant="outlined">Login</button>
      </Link>
    </div>
  );
}

export default Signup;
