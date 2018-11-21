import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './Pages/Register.js';
import Login from './Pages/Login.js';
import AddRelease from './Pages/AddRelease.js';
import Home from './Pages/Home.js';

class Promomoria extends Component {

  state = {
    loggedInUser: 12,
    registerNewUser: false
  }

  componentDidMount() {
    // SESSION TESTING
    // fetch('api/')
    //   .then(res => res.text())
    //   .then(result => {
    //       console.log(result)
    //       console.log('success')
    //   })
    //   .catch((error) => {
    //       console.log(error);
    //   });
  }

  handleStartPage = value => {
    if (value === 'openRegisterUser') {
      this.setState({registerNewUser: true});
    } else {
      this.setState({registerNewUser: false});
    }
  }

  handleLogin = userId => {
    this.setState({loggedInUser: userId});
  }

  render() {
    let homePage = '';
    if (this.state.registerNewUser === true) {
      homePage = <Register handleStartPage={this.handleStartPage} />
    } else if (this.state.loggedInUser !== false && this.state.registerNewUser === false) {
      homePage = <Home />
    } else {
      homePage = <Login handleStartPage={this.handleStartPage} handleLogin={this.handleLogin} />
    }
    return (
      <div className="Promomoria">
        {homePage}
      </div>
    );
  }
}

export default Promomoria;
