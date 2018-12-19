import React, { Component } from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';
import axios from 'axios';

class StartLogin extends Component {

    state = {
        loginEmail: '',
        loginPassword: '',
        message: ''
    }

    handleEmail = event => {
        // Handling email input event.
        this.setState({loginEmail: event.target.value});
    }

    handlePassword = event => {
        // Handling password input event.
        this.setState({loginPassword: event.target.value});
    }

    loginUser = () => {
        if (this.state.loginEmail !== '' && this.state.loginPassword !== '') {
            // If no fields are empty, call fetch/axios:
            axios.post('http://www.arsenikrecords.se/express/login', {
                email: this.state.loginEmail,
                password: this.state.loginPassword         
            }).then((res) => {
                if (res.data.success === true) {
                    // Object holding necessary user info in object.
                    let userObject = {
                        id: res.data.user_id,
                        label_name: res.data.label_name
                    }
                    // Sends information to Promomoria.js.
                    this.props.handleLogin(userObject);
                } else {
                    // Error message sent from Express app.
                    this.setState({message: res.data.message});
                }
            });
        } else {
            // If any field is empty.
            this.setState({message: 'You have to fill in all the fields correct!'});
        }
    }

    openRegisterUser = () => {
        // Handle startpage, information sent to Start.js.
        this.props.handleStartPage('register'); 
    }

    render() {
        return (
            <main className="Login">
                <div className="LoginForm">
                    <Inputfield 
                        className={'full-width'}
                        placeholder={'Email'}
                        onChange={this.handleEmail}
                    />
                    <Inputfield 
                        className={'full-width'}
                        placeholder={'Password'}
                        type={'password'}
                        onChange={this.handlePassword}
                    />
                    <p className="helper">{this.props.message || this.state.message}</p>
                    <div>
                        <Button 
                            className={'half-width'}
                            innerText={'New user'}
                            onClick={this.openRegisterUser}
                        />
                        <Button 
                            className={'half-width'}
                            innerText={'Login'}
                            onClick={this.loginUser}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default StartLogin;