import React, { Component } from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';

class Register extends Component {

    state = {
        newUsername: '',
        newPassword: '',
        // newRepeatedPassword: '',
        newLabelName: '',
        newEmail: '',
    }

    handleUsername = event => {
        // console.log(event.target.value);
        this.setState({ newUsername: event.target.value });
    }

    handlePassword = event => {
        // console.log(event.target.value);
        this.setState({ newPassword: event.target.value });
    }

    // handleRepeatedPassword = event => {
    //     // console.log(event.target.value);
    //     this.setState({ newRepeatedPassword: event.target.value });
    // }

    handleLabelName = event => {
        // console.log(event.target.value);
        this.setState({ newLabelName: event.target.value });
    }

    handleEmail = event => {
        // console.log(event.target.value);
        this.setState({ newEmail: event.target.value });
    }

    registerUser = event => {
        console.log(this.state.newUsername);
        console.log(this.state.newPassword);
        // console.log(this.state.newRepeatedPassword);
        console.log(this.state.newLabelName);
        console.log(this.state.newEmail);

        let data = {
            username: this.state.newUsername,
            password: this.state.newPassword,
            label_name: this.state.newLabelName,
            email: this.state.newEmail
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

    render() {
        return (
            <div className="Register">
                <Inputfield 
                    placeholder={'Username'}
                    onChange={this.handleUsername}
                />
                <Inputfield 
                    placeholder={'Password'}
                    onChange={this.handlePassword}
                />
                {/* <Inputfield 
                    placeholder={'Repeat Password'}
                    onChange={this.handleRepeatedPassword}
                /> */}
                <Inputfield 
                    placeholder={'Label Name'}
                    onChange={this.handleLabelName}
                />
                <Inputfield 
                    placeholder={'Email'}
                    onChange={this.handleEmail}
                />
                <Button 
                    innerText={'Back'}
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