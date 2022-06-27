import React from "react";


function Navbar(){
    return (
        <div className="nav-bar">
            <a href="/" style={{textDecoration: 'none', color: "white"}}><h1 className="nav-bar-logo">INOTE</h1></a>
            <a href="/login" style={{textDecoration: 'none', color: "white"}}><h2 className="nav-bar-text">Login</h2></a>
            <a href="/sign-up" style={{textDecoration: 'none', color: "white"}}><h2 className="nav-bar-text">Sign up</h2></a>
        </div>
    );
};

export default Navbar;