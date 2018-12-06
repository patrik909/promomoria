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
        // let startPage = '';
        // if (this.props.user !== false) {
        //     startPage = <Home userData={this.props.user} />;
        // } else if (this.state.page === 'register') {
        //     startPage = <Register handleStartPage={this.handleStartPage} />;
        // } else {
        //     startPage = <Login handleStartPage={this.handleStartPage} handleLogin={this.handleLogin} message={this.state.message}/>;
        // }

        return (
            <div>
                {this.props.user !== false ? (
                    <main className="Start Feed">
                        <h3><Link to="/AddRelease" className="AddReleaseLink">+ Add release</Link></h3>
                        <StartFeed userId={this.props.user.id}/>                   
                    </main>               
                ) : (
                    null
                )}
            </div>
        );
    }
}

export default Start;