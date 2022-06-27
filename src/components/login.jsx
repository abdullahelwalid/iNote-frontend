import React from "react";
import Input from "./input";




function Form(){
    return (
            <form className="form" className="container">
                <Input
                    type="text" placeholder="Username"
                />
                <Input
                    type="password" placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
    );
};

export default Form;