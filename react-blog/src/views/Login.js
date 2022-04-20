import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props){
    let navigate = useNavigate();
    let base_url = props.base_url
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Handle Submit')

        //Login request 
        var myHeaders = new Headers();




    } 

    return(
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <div className="row">
                <div className="form-group">
                <label htmlFor="email">Email</label>

                    <label htmlFor="username">Username</label>
                    <input type='text' name="username" className="form-control" placeholder="Username"></input>

                    <label htmlFor="password">Password</label>
                    <input type='text' name="password" className="form-control" placeholder="Password"></input>

                    <input type="submit" className="btn btn-dark mt-2 w-100" value="Sign Up"/>
                </div>
            </div>
        </form>
    )



}