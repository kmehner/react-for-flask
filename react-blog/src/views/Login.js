import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props){
    let navigate = useNavigate();
    let base_url = props.base_url

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Handle Submit')

        //Login request 
        let username = e.target.username.value;
        let password = e.target.password.value;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Basic " + btoa(`${username}:${password}`))

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'

        }

        fetch(`${base_url}/auth/token`, requestOptions)
            .then(res => res.json())
            .then (data => {

                if (data.error){
                    this.props.flashMessage('Your username/password is incorrect', 'danger')
                } else {
                    let token = data.token 
                    localStorage.setItem('token', token)
                    props.flashMessage("You have successfully logged in.", "success")
                    props.login()
                    navigate('/')

                }
            })
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