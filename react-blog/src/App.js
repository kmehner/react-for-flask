import React, {Component} from "react";
import { Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";


export default class App extends Component{
  
  constructor(props){
      super(props);
      this.state = {
          count: 0,
          name: null
      }
  }

  render(){
    return(
      <>
        <Nav></Nav>
        <div className="container">
          <p>hello this is app.js</p>
          <Routes>
          </Routes>
        </div>
      </>
    )
  }

}

