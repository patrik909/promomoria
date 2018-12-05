import React, { Component } from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';
import axios from 'axios';

class Register extends Component {

    state = {
        loginEmail: '',
        loginPassword: '',
        message: ''
    }

    handleEmail = event => {
        this.setState({loginEmail: event.target.value});
    }

    handlePassword = event => {
        this.setState({loginPassword: event.target.value});
    }

    loginUser = () => {
        if (this.state.loginEmail !== '' && this.state.loginPassword !== '') {
            axios.post('api/login', {
                email: this.state.loginEmail,
                password: this.state.loginPassword         
            }).then((res) => {
                if (res.data.success === true) {
                    let userObject = {
                        id: res.data.user_id,
                        label_name: res.data.label_name
                    }
                    this.props.handleLogin(userObject);
                } else {
                    this.setState({message: res.data.message});
                }
            });
        } else {
            this.setState({message: 'You have to fill in all the fields correct'});
        }
    }

    openRegisterUser = () => {
        this.props.handleStartPage('register'); 
    }

    render() {
        return (
            <main className="Login">
                <div className="LoginForm">
                    <h1>Login</h1>
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
                    <p>{this.props.message || this.state.message}</p>
                </div>
            </main>
        );
    }
}

export default Register;