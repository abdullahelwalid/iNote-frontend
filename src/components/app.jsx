import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./home";
import Form from "./login"
import Signup from "./sign-up";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Form/>}/>
      <Route exact path="/sign-up" element={<Signup/>}/>
    </Routes>
    </div>
  );
};

export default App;
