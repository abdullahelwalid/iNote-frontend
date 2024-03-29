import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./home";
import Form from "./login";
import PageNotFound from "./page_not_found";
import Signup from "./sign-up";
import Navbar from "./navbar";
import FeedbackMessage from "./feedback";
import { userContext } from "../contexts/context";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState();
  const URL = "https://api.inotenow.com";

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("user_id") === null
    ) {
      return setAuthenticated(false);
    }
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("user_id"));
    setAuthenticated(true);
  }, [localStorage.getItem("token"), localStorage.getItem("user_id")]);
  console.log(useLocation().pathname)
  return (
    <userContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        token,
        setToken,
        userId,
        setUserId,
        feedbackMessage,
        setFeedbackMessage,
        collapse,
        setSuccess,
        setError,
        setCollapse,
        URL,
      }}
    >
      <div className="app">
        <Navbar />
        {error && <FeedbackMessage type="error" />}
        {success && <FeedbackMessage type="success" />}
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/login"
            element={authenticated ? <Navigate to="/" /> : <Form />}
          />
          <Route
            exact
            path="/sign-up"
            element={authenticated ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
