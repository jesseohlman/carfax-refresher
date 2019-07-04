import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';


import ListCreate from './components/listCreate';
import ListSelect from './components/listSelect';

import UserSignUp from './components/userSignUp';
import UserSignIn from './components/userSignIn';


const axios = require("axios");

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {id: undefined}
    }

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);

  }

  componentDidMount(){
    fetch("/users", {credentials: "include"})
    .then(res => res.json())
    .then((user) => {
      this.setState({user: user});
    })
  }

  handleSignOut(){
    axios.get("/users/signOut")
    .then((res) => {

      fetch("/users", {credentials: "include"})
      .then(res => res.json())
      .then((user) => {
        this.setState({user: user});
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleSignIn(input){  
     axios.post("/users/signIn", {
       email: input.email,
       password: input.password
     })
     .then((res) => {

      fetch("/users", {credentials: "include"})
      .then(res => res.json())
      .then((user) => {
        this.setState({user: user});
      })
       console.log("SignIn attempted");
     })
     .catch((err) => {
       console.log(err);
     })
   }



  render() {
    var currentUser = this.state.user.id === undefined ? false : true;
    return (
      <div className="App">
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Router>
          <div>
            <ul>
            {currentUser ? (<div>
                <li><Link to="/lists/new/">New List</Link></li>
                <li><Link to="/lists/select/">Select List</Link></li>
                <button onClick={this.handleSignOut}>Sign Out</button>
              </div>) : (<div>
                <li><Link to="/users/new/">Create Account</Link></li>
                <li><Link to="/users/signIn/">Sign In</Link></li>
              </div>)}
            </ul>
            <Route path="/lists/new/" component={ListCreate} />
            <Route path="/lists/select/" component={ListSelect} />

            <Route path="/users/new/" component={UserSignUp}/>
            <Route path="/users/signIn/" render={(props) => <UserSignIn {...props} handleSignIn={this.handleSignIn} />}/>


          </div>
        </Router>

      </div>
    );
  }
}

export default App;
