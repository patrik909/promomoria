import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';

class Register extends Component {

    state = {
        loginEmail: '',
        loginPassword: ''
    }

    handleEmail = event => {
        this.setState({ loginEmail: event.target.value });
    }

    handlePassword = event => {
        this.setState({ loginPassword: event.target.value });
    }

    openRegisterUser = event => {
        this.props.handleStartPage('openRegisterUser'); 
    }


    loginUser = event => {
        if (
            this.state.loginEmail !== '' &&
            this.state.loginPassword !== '' 
        ) {
            let data = {
                email: this.state.loginEmail,
                password: this.state.loginPassword
            };
    
            fetch('api/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                const userId = result[0].id;
                // this.props.handleLogin(); // lägg till i promomoria.js
                // console.log(userId);
                this.props.handleLogin(userId)
                console.log('success')
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="Login">
                <Inputfield 
                    placeholder={'Email'}
                    onChange={this.handleEmail}
                />
                <Inputfield 
                    placeholder={'Password'}
                    onChange={this.handlePassword}
                />
                <Button 
                    innerText={'New user'}
                    onClick={this.openRegisterUser}
                />
                <Button 
                    innerText={'Login'}
                    onClick={this.loginUser}
                />
            </div>
        );
    }
}

export default Register;