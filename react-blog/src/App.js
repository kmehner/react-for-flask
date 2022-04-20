import React, {Component} from "react";
import { Routes, Route } from 'react-router-dom';
import AlertMessage from "./components/AlertMessage";
import Nav from "./components/Nav";
import Home from "./views/Home"
import Signup from "./views/SignUp";



export default class App extends Component{
  
  constructor(props){
      super(props);
      this.state = {
          base_url: 'https://kekambas-blog.herokuapp.com/',
          message: null,
          category: null
      }
  }

  flashMessage = (message, category) => {
    this.setState({message, category})
  }

  render(){
    return(
      <div>
        <Nav></Nav>
        <div className="container">
          <p>hello this is app.js</p>
          {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
          <Routes>
            {/* <Route path="/"        element={<Home />} /> */}
            <Route path='/sign-up' element={<Signup base_url = {this.state.base_url} flashMessage={this.flashMessage}/>}/>
          </Routes>
        </div>
      </div>
    )
  }

}

