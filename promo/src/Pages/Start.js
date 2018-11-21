import React, { Component } from 'react';
import Home from '../Components/Home.js';
import Login from '../Components/Login.js';
import Register from '../Components/Register.js';

class Start extends Component {

    state = {
        page: 'login'
    }

    handleLogin = user => {
        this.props.handleLogin(user);
    }

    handleStartPage = pageValue => {
        this.setState({page: pageValue});
    }

    render() {

        let startPage = '';
        if (this.props.user !== false) {
            startPage = <Home userData={this.props.user} />;
        } else if (this.state.page === 'register') {
            startPage = <Register handleStartPage={this.handleStartPage} />;
        } else {
            startPage = <Login handleStartPage={this.handleStartPage} handleLogin={this.handleLogin} />;
        }

        return (
            <div>
                {startPage}
            </div>
        );
    }
}

export default Start;