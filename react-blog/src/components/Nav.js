import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                  <a href='/'>Home</a>
                  <a href='/blog'>Posts</a>
                  { props.loggedIn ? (
                    <>
                       <Link className="nav-link" to="/createpost">Create Post</Link>
                      <a href='/' onClick={props.logUserOut}>Logout</a>
                    </>
                  ) : (
                    <>
                      <a href='/sign-up'>Sign Up</a>
                      <a href='/login'>Login</a>
                    </>
                  )}   
              </div>
            </div>
        </div>
    </nav>
  )
}