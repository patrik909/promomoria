import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import './css/main.css';

import Start from './Pages/Start.js';
import AddRelease from './Pages/AddRelease.js';
import Feedback from './Pages/Feedback.js'
import Release from './Pages/Release.js'
// import PageNotFound from './Pages/PageNotFound.js'

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
                    <Header labelName={this.state.loggedInUser.label_name || 'Welcome'} />
                    <Route exact path="/" component={() => <Start user={this.state.loggedInUser} handleLogin={this.handleLogin} /> } />
                    <Route path="/Release/:id" component={ReleasePage}/>  
                    {this.state.loggedInUser ? ( <Route path="/AddRelease" component={() => <AddRelease user={this.state.loggedInUser} /> } /> ) : ( null )}
                    {this.state.loggedInUser ? ( <Route path="/Feedback/:id" component={FeedbackPage}/> ) : ( null )}
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Promomoria;