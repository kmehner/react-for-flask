import React, {Component} from "react";
import { Routes, Route } from 'react-router-dom';
import AlertMessage from "./components/AlertMessage";
import Nav from "./components/Nav";
import Home from "./views/Home"
import Signup from "./views/SignUp";
import Login from "./views/Login";
import Blog from "./views/Blog";


export default class App extends Component{
  
  constructor(props){
      super(props);
      this.state = {
          base_url: 'https://kekambas-blog.herokuapp.com/',
          message: null,
          category: null,
          loggedIn: localStorage.getItem('token') ? true : false
      }
  }

  flashMessage = (message, category) => {
    this.setState({message, category})
  }

  login = () => {
    this.setState({loggedIn: true})
  };

  logout = () => {
    localStorage.removeItem('token');
    this.flashMessage("You have successfully logged out", "success");
    this.setState({loggedIn: false});
  };

  render(){
    return(
      <div>
        <Nav loggedIn={this.state.loggedIn} logUserOut={this.logout}></Nav>
        <div className="container">
          <p>hello this is app.js</p>
          {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path='/blog'    element={<Blog   loggedIn={this.state.loggedIn} />} />
            <Route path='/sign-up' element={<Signup base_url = {this.state.base_url} flashMessage={this.flashMessage}/>}/>
            <Route path="/login"   element={<Login  base_url = {this.state.base_url} flashMessage={this.flashMessage} login={this.login}/>}/>
          </Routes>
        </div>
      </div>
    )
  }
}

