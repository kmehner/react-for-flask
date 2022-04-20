import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props){
    let navigate = useNavigate();
    let base_url = props.base_url
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Handle Submit')

        // Check passwords
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;

        if (password !== confirmPass){
            props.flashMessage("Passwords do not match", "warning");
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            console.log(raw)

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/auth/users`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        // If there is an error when accessing the data
                        props.flashMessage(data.error, "danger")
                    } else{
                        // There is NO error, navigate to home
                        props.flashMessage(`${data.username} has been registered`, "success")
                        console.log('Fetch complete')
                        navigate('/')
                    }
                });
        }


    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="row">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type='text' name="email" className="form-control" placeholder="Email"></input>

                    <label htmlFor="username">Username</label>
                    <input type='text' name="username" className="form-control" placeholder="Username"></input>

                    <label htmlFor="password">Password</label>
                    <input type='text' name="password" className="form-control" placeholder="Password"></input>

                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type='text' name="confirmPass" className="form-control" placeholder="Confirm Password"></input>

                    <input type="submit" className="btn btn-dark mt-2 w-100" value="Sign Up"/>

                </div>
            </div>

        </form>
    )

}