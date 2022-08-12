import React, { useState, useContext } from "react";
import Input from "./input";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { userContext } from "../contexts/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import LoadingButton from "@mui/lab/LoadingButton";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirnPasswordError, setconfirnPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    setFeedbackMessage,
    setSuccess,
    setError,
    setCollapse,
    URL,
  } = useContext(userContext);
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function onSubmitForm() {
    setLoading(true);

    if (firstName.length < 1) {
      setLoading(false);
      return setFirstnameError(true);
    }
    if (lastName.length < 1) {
      setLoading(false);
      return setLastnameError(true);
    }
    if (email.length < 1) {
      setLoading(false);
      return setEmailError(true);
    }
    if (username.length < 1) {
      setLoading(false);
      return setUsernameError(true);
    }
    if (password.length < 8) {
      setLoading(false);
      return setPasswordError(true);
    }
    if (password !== confirmPassword) {
      setLoading(false);
      return setconfirnPasswordError(true);
    }
    axios
      .post(`${URL}/sign-up`, {
        username: username,
        email: email,
        firstname: firstName,
        lastname: lastName,
        password: password,
      })
      .then((resp) => {
        setLoading(false);
        setFeedbackMessage("account created successfully");
        setCollapse(true);
        setSuccess(true);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        setFeedbackMessage("An error has occurred");
        setCollapse(true);
        setError(true);
      });
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
          error={firstnameError}
          errorMessage="First Name field can't be empty"
          placeholder="First name"
          value={firstName}
          onChange={(event) => {
            setFirstnameError(false);
            setFirstName(event.target.value);
          }}
        />
        <Input
          type="text"
          error={lastnameError}
          errorMessage="Last Name field can't be empty"
          placeholder="Last name"
          value={lastName}
          onChange={(event) => {
            setLastnameError(false);
            setLastName(event.target.value);
          }}
        />
        <Input
          type="email"
          error={emailError}
          errorMessage="Email field can't be empty"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmailError(false);
            setEmail(event.target.value);
          }}
        />
        <Input
          type="text"
          error={usernameError}
          errorMessage="username field can't be empty"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsernameError(false);
            setUsername(event.target.value);
          }}
        />
        {/* <Input
          type="password"
          error={passwordError}
          errorMessage="password field can't be empty"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPasswordError(false);
            setPassword(event.target.value);
          }}
        /> */}
        <FormControl sx={{ width: "25ch" }} variant="outlined">
          <InputLabel
            htmlFor={
              passwordError ? "component-error" : "outlined-adornment-password"
            }
            error={passwordError}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id={
              passwordError ? "component-error" : "outlined-adornment-password"
            }
            type={values.showPassword ? "text" : "password"}
            error={passwordError}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError(false);
              handleChange("password");
            }}
            endAdornment={
              <InputAdornment style={{ width: "auto" }} position="end">
                <IconButton
                  style={{ width: "auto" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {passwordError && (
            <FormHelperText style={{ color: "red" }} id="component-error-text">
              Password length must be more than 7 charachter
            </FormHelperText>
          )}
        </FormControl>
        <Input
          type="password"
          error={confirnPasswordError}
          errorMessage="Password is not matching"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(false);
            setConfirmPassword(event.target.value);
          }}
        />
        <div style={{ margin: "1rem" }}>
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            style={{ width: "14.5rem" }}
            onClick={onSubmitForm}
          >
            Sign Up
          </LoadingButton>
        </div>
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
