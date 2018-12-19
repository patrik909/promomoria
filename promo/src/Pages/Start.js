import React, { Component } from 'react';
import history from '../history';
import StartFeed from '../Components/StartFeed.js';
import StartLogin from '../Components/StartLogin.js';
import StartRegister from '../Components/StartRegister.js';

class Start extends Component {

    state = {
        page: 'login', // Login-page is default.
        message: ''
    }

    componentDidMount() {
        history.push('/');
    }

    handleLogin = user => {
        // Handling page props from StartLogin
        this.props.handleLogin(user);
    }

    handleStartPage = (pageValue, message) => {
        // Handling page props from StartLogin & StartRegister components.
        this.setState({
            page: pageValue,
            message
        });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.user !== false ? (
                            <StartFeed userId={this.props.user.id}/>                                  
                    ) : (
                        this.state.page === 'register' ? (
                            <StartRegister handleStartPage={this.handleStartPage} />
                        ) : (
                            <StartLogin handleStartPage={this.handleStartPage} handleLogin={this.handleLogin} message={this.state.message}/>
                        )
                    )
                }
            </React.Fragment>
        );
    }
}

export default Start;