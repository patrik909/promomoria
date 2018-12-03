import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/main.css';
// import './App.css';

import Start from './Pages/Start.js';
import AddRelease from './Pages/AddRelease.js';
import Feedback from './Pages/Feedback.js'
import Release from './Pages/Release.js'

class Promomoria extends Component {

    state = {
    //   loggedInUser: false
    loggedInUser: {
            // this is a placeholder
            id: 12,
            label_name: "Arsenik Records"
        }
    }

    handleLogin = user => {
        this.setState({loggedInUser: user})
    }

    render() {

        const FeedbackPage = ({ match }) => <Feedback match={match} userData={this.state.loggedInUser} />;
        const ReleasePage = ({ match }) => <Release match={match} />;

        return (
            <Router>
                <div className="Promomoria">
                    <Route exact path="/" component={() => <Start user={this.state.loggedInUser} handleLogin={this.handleLogin} /> } />
                    <Route path="/AddRelease" component={() => <AddRelease user={this.state.loggedInUser} /> } />
                    <Route path="/Feedback/:id" component={FeedbackPage}/>
                    <Route path="/Release/:id" component={ReleasePage}/>
                </div>
            </Router>
        );
    }
}

export default Promomoria;