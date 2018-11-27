import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Start from './Pages/Start.js';
import AddRelease from './Pages/AddRelease.js';
import Feedback from './Pages/Feedback.js'

class Promomoria extends Component {

    state = {
      loggedInUser: [{
          // this is a placeholder
          id: 12,
          label_name: "Arsenik Records"
      }]
    }

  // handleLogin = user => {
  //   this.setState({loggedInUser: user})
  // }

    render() {

        const FeedbackPage = ({ match }) => <Feedback match={match} userData={this.state.loggedInUser}/>;

        return (
            <Router>
                <div className="Promomoria">
                    <Route exact path="/" component={() => <Start user={this.state.loggedInUser} handleLogin={this.handleLogin} /> } />
                    <Route path="/AddRelease" component={() => <AddRelease user={this.state.loggedInUser} /> } />
                    <Route path="/Feedback/:id" component={FeedbackPage}/>
                </div>
            </Router>
        );
    }
}

export default Promomoria;