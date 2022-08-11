import React, { useState, useContext } from "react";
import Input from "./input";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { userContext } from "../contexts/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setFeedbackMessage, setSuccess, setError, setCollapse, URL } = useContext(
    userContext
  );
  const navigate = useNavigate();

  function onSubmitForm() {
    if (password === confirmPassword) {
      axios
        .post(`${URL}/sign-up`, {
          username: username,
          email: email,
          firstname: firstName,
          lastname: lastName,
          password: password,
        })
        .then((resp) => {
          setFeedbackMessage("account created successfully");
          setCollapse(true);
          setSuccess(true);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          setFeedbackMessage("An error has occurred");
          setCollapse(true);
          setError(true);
        });
    }
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h1 className="title">Sign up</h1>
      <Divider />
      <form
        className="form container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <button type="submit" onClick={onSubmitForm}>
          Sign Up
        </button>
      </form>

      <p style={{ fontSize: "16px", paddingBottom: "10px" }}>
        You already have an account?
      </p>
      <Link to="/login">
        <button variant="outlined">Login</button>
      </Link>
    </div>
  );
}

export default Signup;
