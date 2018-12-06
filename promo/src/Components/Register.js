import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';
import axios from 'axios';

class Register extends Component {

    state = {
        newEmail: '',
        newPassword: '',
        newPasswordRepeated: false,
        newLabelName: '',
        message: '',
        redirect: false
    }

    handleEmail = event => {
        if ( event.target.value.includes('@') && event.target.value.includes('.') ) {
            this.setState({ newEmail: event.target.value });
            console.log(event.target.value) 
        }
    }

    handlePassword = event => {
        this.setState({ newPassword: event.target.value });
    }

    handleRepeatedPassword = event => {
        if (event.target.value === this.state.newPassword) {
            this.setState({ newPasswordRepeated: true });
        } else {
            this.setState({ newPasswordRepeated: false });
        }
    }

    handleLabelName = event => {
        this.setState({ newLabelName: event.target.value });
    }

    closeRegisterUser = event => {
        this.props.handleStartPage('login', ''); 
    }

    registerUser = event => {
        if (
            this.state.newEmail !== '' &&
            this.state.newPassword !== '' &&
            this.state.newLabelName !== '' &&
            this.state.newPasswordRepeated === true    
        ) {
            axios.post('api/add_user', {
                email: this.state.newEmail,
                password: this.state.newPassword,
                label_name: this.state.newLabelName          
            }).then((res) => {
                if ( res.data.success === true) {
                    this.props.handleStartPage('login', 'Thank you for registering an account, you will get an e-mail from us in the next days.');
                } else {
                    this.setState({ message: res.data.message});
                }
            });
        } else {
            this.setState({ message: 'You have to fill in all the fields correct' });
        }
    }

    render() {
        return (
            <main className="Register">
                <div className="RegisterForm">
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
                    <Inputfield 
                        className={'full-width'}
                        placeholder={'Repeat Password'}
                        type={'password'}
                        onChange={this.handleRepeatedPassword}
                    />
                    <Inputfield 
                        className={'full-width'}
                        placeholder={'Label Name'}
                        onChange={this.handleLabelName}
                    />
                    <p className="helper">{this.state.message}</p>
                    <div>
                        <Button 
                            className={'half-width'}
                            innerText={'Back'}
                            onClick={this.closeRegisterUser}
                        />
                        <Button 
                            className={'half-width'}
                            innerText={'Register'}
                            onClick={this.registerUser}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default Register;