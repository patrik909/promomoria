import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';
import axios from 'axios';

class StartRegister extends Component {

    state = {
        newEmail: '',
        newPassword: '',
        newPasswordRepeated: false,
        newLabelName: '',
        message: '',
        redirect: false
    }

    handleEmail = event => {
        // Validates the email.
        if (event.target.value.includes('@') && event.target.value.includes('.')) {
            this.setState({newEmail: event.target.value});
        }
    }

    handlePassword = event => {
        // Handling password input event.
        this.setState({newPassword: event.target.value});
    }

    handleRepeatedPassword = event => {
        // Checks the repeated password, have to match.
        if (event.target.value === this.state.newPassword) {
            this.setState({newPasswordRepeated: true});
        } else {
            this.setState({newPasswordRepeated: false});
        }
    }

    handleLabelName = event => {
        // Handling label name input event.
        this.setState({newLabelName: event.target.value});
    }

    closeRegisterUser = () => {
         // Handling start page state in Start.js.
        this.props.handleStartPage('login', ''); 
    }

    registerUser = () => {
        if (
            this.state.newEmail !== '' &&
            this.state.newPassword !== '' &&
            this.state.newLabelName !== '' &&
            this.state.newPasswordRepeated === true    
        ) {
            // If no fields is empty create user:
            axios.post('http://www.arsenikrecords.se/express/add_user', {
                email: this.state.newEmail,
                password: this.state.newPassword,
                label_name: this.state.newLabelName          
            }).then((res) => {
                if (res.data.success === true) {
                    // Success, an email will be sent to admin, will contact the user for activation.
                    this.props.handleStartPage('login', 'Thank you for registering an account, you will get an e-mail from us in the next days.');
                } else {
                    // Error message returned from express explaining the problem.
                    console.log(res)
                    // this.setState({ message: res.data.message});
                }
            });
        } else {
            // Error message if one or more fields is empty.
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

export default StartRegister;