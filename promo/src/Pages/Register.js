import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';

class Register extends Component {

    state = {
        newEmail: '',
        newPassword: '',
        newPasswordRepeated: false,
        newLabelName: '',
    }

    handleEmail = event => {
        this.setState({ newEmail: event.target.value });
    }

    handlePassword = event => {
        this.setState({ newPassword: event.target.value });
    }

    handleRepeatedPassword = event => {
        if (event.target.value === this.state.newPassword) {
            console.log('correct');
            this.setState({ newPasswordRepeated: true });
        } else {
            console.log('not correct');
            this.setState({ newPasswordRepeated: false });
        }
    }

    handleLabelName = event => {
        this.setState({ newLabelName: event.target.value });
    }

    closeRegisterUser = event => {
        this.props.handleStartPage('closeRegisterUser'); 
    }

    registerUser = event => {
        if (
            this.state.newEmail !== '' &&
            this.state.newPassword !== '' &&
            this.state.newLabelName !== '' &&
            this.state.newPasswordRepeated === true    
        ) {
            let data = {
                email: this.state.newEmail,
                password: this.state.newPassword,
                label_name: this.state.newLabelName
            };
    
            fetch('api/add_user', {
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
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="Register">
                <Inputfield 
                    placeholder={'Email'}
                    onChange={this.handleEmail}
                />
                <Inputfield 
                    placeholder={'Password'}
                    onChange={this.handlePassword}
                />
                <Inputfield 
                    placeholder={'Repeat Password'}
                    onChange={this.handleRepeatedPassword}
                />
                <Inputfield 
                    placeholder={'Label Name'}
                    onChange={this.handleLabelName}
                />
                <Button 
                    innerText={'Back'}
                    onClick={this.closeRegisterUser}
                />
                <Button 
                    innerText={'Register'}
                    onClick={this.registerUser}
                />
            </div>
        );
    }
}

export default Register;