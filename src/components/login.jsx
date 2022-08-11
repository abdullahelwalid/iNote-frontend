import React, { useState, useContext } from "react";
import Input from "./input";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { userContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

function Form() {
  const [username, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
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
  const navigate = useNavigate();
  const {
    setAuthenticated,
    setError,
    setFeedbackMessage,
    setCollapse,
    setToken,
    setUserId,
    URL,
  } = useContext(userContext);
  function submitForm() {
    if (username.length < 1) {
      return setUsernameError(true);
    }

    if (password1.length < 1) {
      return setPasswordError(true);
    }
    axios
      .post(`${URL}/sign-in`, {
        user_id: username,
        password: password1,
      })
      .then((resp) => {
        setToken(resp.data.token);
        localStorage.clear();
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user_id", resp.data.user_id);
        setUserId(resp.data.user_id);
        setAuthenticated(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError(true);
          setFeedbackMessage("Invalid username or password");
          setCollapse(true);
          setAuthenticated(false);
        }
      });
  }

  return (
    <div>
      <h1 className="title">Login</h1>

      <Divider />

      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          error={usernameError}
          helperText={usernameError ? "username field can't be empty" : ""}
          label="Username"
          type="text"
          variant="outlined"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setUsernameError(false);
          }}
        />
      </Box>
      <FormControl sx={{ width: "25ch" }} variant="outlined">
        <InputLabel htmlFor={passwordError? "component-error": "outlined-adornment-password"} error={passwordError}>Password</InputLabel>
        <OutlinedInput
          id={passwordError? "component-error":  "outlined-adornment-password"}
          type={values.showPassword ? "text" : "password"}
          error={passwordError}
          value={password1}
          onChange={(event) => {
            setPassword(event.target.value);
            setPasswordError(false);
            handleChange("password");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
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
        { 
        passwordError && <FormHelperText style={{color: "red"}} id="component-error-text">Password field can't be empty</FormHelperText>
        }
      </FormControl>

      {/* <form
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
      </form> */}
      <div style={{ margin: "1rem" }}>
        <Button
          variant="contained"
          type="submit"
          style={{ width: "13rem" }}
          onClick={submitForm}
        >
          Sign in
        </Button>
      </div>
      <p style={{ fontSize: "16px", paddingBottom: "10px" }}>
        You don't have an account?
      </p>
      <Link to="/sign-up">
        <button
          variant="outlined"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign up
        </button>
      </Link>
    </div>
  );
}
export default Form;
