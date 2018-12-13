import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import './css/main.css';

import Start from './Pages/Start.js';
import AddRelease from './Pages/AddRelease.js';
import UpdateRelease from './Pages/UpdateRelease.js';
import Feedback from './Pages/Feedback.js'
import Release from './Pages/Release.js'

class Promomoria extends Component {

    state = {
      loggedInUser: false
    }

    componentDidMount(){
        const releasePage = window.location.pathname.toLowerCase().includes('/release/');
        const updatePage = window.location.pathname.toLowerCase().includes('/update/');
        if (!releasePage && !updatePage) {
            axios.post('api/').then((res) => {
                if (res.data.success === true) {
                    const userObject = {
                        id: res.data.user_id,
                        label_name: res.data.label_name
                    }
                    this.setState({loggedInUser: userObject})             
                }
            });
        }
    }

    handleLogin = user => {
        this.setState({loggedInUser: user})
    }

    logOutUser = () => {
        axios.post('api/log_out').then((logOut) => {
            if (logOut.data === true) {
                this.setState({loggedInUser: false})
            }
        });    
    }

    render() {

        const FeedbackPage = ({ match }) => <Feedback match={match} userData={this.state.loggedInUser} />;
        const UpdatePage = ({ match }) => <UpdateRelease match={match} />;
        const ReleasePage = ({ match }) => <Release match={match} />;

        return (
            <Router>
                <div className="Promomoria">
                    <Header labelName={this.state.loggedInUser.label_name} loggedInUser={this.state.loggedInUser} logOutUser={this.logOutUser}/>
                    <Route exact path="/" component={() => <Start user={this.state.loggedInUser} handleLogin={this.handleLogin} /> } />
                    <Route path="/Release/:id" component={ReleasePage}/>  
                    {this.state.loggedInUser ? ( <Route path="/Add" component={() => <AddRelease user={this.state.loggedInUser} /> } /> ) : ( null )}
                    {this.state.loggedInUser ? ( <Route path="/Feedback/:id" component={FeedbackPage}/> ) : ( null )}
                    {this.state.loggedInUser ? ( <Route path="/Update/:id" component={UpdatePage}/> ) : ( null )}
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Promomoria;