import React, { Component } from 'react';
import Home from '../Components/Home.js';
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

        let startPage = '';
        if (this.props.user !== false) {
            startPage = <Home userData={this.props.user} />;
        } else if (this.state.page === 'register') {
            startPage = <Register handleStartPage={this.handleStartPage} />;
        } else {
            startPage = <Login handleStartPage={this.handleStartPage} handleLogin={this.handleLogin} message={this.state.message}/>;
        }

        return (
            <div>
                {startPage}
            </div>
        );
    }
}

export default Start;