import React, { Component } from 'react';
import './App.css';
import Register from './Components/Register.js';
import Login from './Components/Login.js';

class Promomoria extends Component {

  state = {
    loggedIn: false,
    registerNewUser: false
  }

  handleStartPage = value => {
    if (value === 'openRegisterUser') {
      this.setState({registerNewUser: true});
    } else {
      this.setState({registerNewUser: false});
    }
  }

  render() {
    let page = '';
    if (this.state.registerNewUser === true) {
      page = <Register handleStartPage={this.handleStartPage} />
    } else {
      page = <Login handleStartPage={this.handleStartPage} />
    }
    return (
      <div className="Promomoria">
        {page}
      </div>
    );
  }
}

export default Promomoria;
