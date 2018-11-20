import React, { Component } from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';

class Register extends Component {

    state = {
        loginUsername: '',
        loginPassword: '',
    }

    handleUsername = event => {
        this.setState({ loginUsername: event.target.value });
    }

    handlePassword = event => {
        this.setState({ loginPassword: event.target.value });
    }

    openRegisterUser = event => {
        this.props.handleStartPage('openRegisterUser'); 
    }

/*
    // registerUser = event => {
    //     if (
    //         this.state.newUsername !== '' &&
    //         this.state.newPassword !== '' &&
    //         this.state.newLabelName !== '' &&
    //         this.state.newEmail !== '' &&
    //         this.state.newPasswordRepeated === true    
    //     ) {
    //         let data = {
    //             username: this.state.newUsername,
    //             password: this.state.newPassword,
    //             label_name: this.state.newLabelName,
    //             email: this.state.newEmail
    //         };
    
    //         fetch('api/add_user', {
    //             method: 'POST',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         })
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     }
    // }*/

    render() {
        return (
            <div className="Login">
                <Inputfield 
                    placeholder={'Username'}
                    onChange={this.handleUsername}
                />
                <Inputfield 
                    placeholder={'Password'}
                    onChange={this.handlePassword}
                />
                <Button 
                    innerText={'Login'}
                    onClick={this.props.handlePage}
                />
                <Button 
                    innerText={'New user'}
                    onClick={this.openRegisterUser}
                />
            </div>
        );
    }
}

export default Register;