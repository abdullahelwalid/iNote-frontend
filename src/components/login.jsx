import React, { useState, useContext } from "react";
import Input from "./input";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { userContext } from "../contexts/context";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    setAuthenticated,
    setError,
    setFeedbackMessage,
    setCollapse,
    setToken,
    setUserId,
  } = useContext(userContext);

  function submitForm() {
    axios
      .post("http://127.0.0.1:5000/sign-in", {
        user_id: username,
        password: password,
      })
      .then((resp) => {
        setToken(resp.data.token);
        localStorage.clear()
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('user_id', resp.data.user_id)
        setUserId(resp.data.user_id);
        setAuthenticated(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError(true);
          setFeedbackMessage("Invalid username or password");
          setCollapse(true);
        }
      });
  }

  return (
    <div>
      <h1 className="title">Login</h1>
      <Divider />
      <form
        className="form container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
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
        <button type="submit" onClick={submitForm}>
          Login
        </button>
      </form>

      <p style={{ fontSize: "16px", paddingBottom: "10px" }}>
        You don't have an account?
      </p>
      <Link to="/sign-up">
        <button variant="outlined" onClick={submitForm}>
          Sign up
        </button>
      </Link>
    </div>
  );
}

export default Form;
