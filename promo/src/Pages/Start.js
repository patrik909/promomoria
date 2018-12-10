import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import StartFeed from '../Components/StartFeed.js';
import Login from '../Components/Login.js';
import Register from '../Components/Register.js';

class Start extends Component {

    state = {
        page: 'login',
        message: ''
    }

    handleLogin = user => {
        this.props.handleLogin(user);
    }

    handleStartPage = (pageValue, message) => {
        this.setState({
            page: pageValue,
            message
        });

    }

    render() {
        return (
            <div>
                {
                    this.props.user !== false ? (
                        <main className="Start Feed">
                            <h3><Link to="/AddRelease" className="AddReleaseLink">+ Add release</Link></h3>
                            <StartFeed userId={this.props.user.id}/>                   
                        </main>               
                    ) : (
                        this.state.page === 'register' ? (
                            <Register handleStartPage={this.handleStartPage} />
                        ) : (
                            <Login handleStartPage={this.handleStartPage} handleLogin={this.handleLogin} message={this.state.message}/>
                        )
                    )
                }
            </div>
        );
    }
}

export default Start;