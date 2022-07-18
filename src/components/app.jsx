import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Form from "./login";
import Signup from "./sign-up";
import Navbar from "./navbar";

import { userContext } from "../contexts/context";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  return (
    <userContext.Provider value={{ authenticated, setAuthenticated }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={authenticated ? <Home />: <Navigate to="/login"/>} />
          <Route exact path="/login" element={authenticated ? <Navigate to="/"/>: <Form/>} />
          <Route exact path="/sign-up" element={authenticated ? <Navigate to="/"/>: <Signup />} />
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
