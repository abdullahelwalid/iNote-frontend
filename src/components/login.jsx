import React from "react";
import Input from "./input";
import { Link } from "react-router-dom";



function Form(){
    return (
        <dev>
            <a href="/" style={{textDecoration: 'none', color: "white"}}><h1 className="title">INOTE</h1></a>
            <form className="form container">
                <Input
                    type="text" placeholder="Username"
                />
                <Input
                    type="password" placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>

            <Link to="/sign-up">
                <button variant="outlined">
                    Sign up
                </button>
            </Link>
        </dev>
    );
};

export default Form;