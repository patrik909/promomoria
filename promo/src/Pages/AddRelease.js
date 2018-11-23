import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';

class AddRelease extends Component {

    state = {
        loggedInUser: '',
        newReleaseArtist: '',
        newReleaseTitle: '',
        newReleaseCatNr: '',
        newReleasePassword: '',
        newReleaseInfoText: ''
    }

    componentDidMount() {
        const userId = this.props.user[0].id;
        this.setState({ loggedInUser: userId });
    }

    handleNewReleaseArtist = event => {
        this.setState({ newReleaseArtist: event.target.value });
    }

    handleNewReleaseTitle = event => {
        this.setState({ newReleaseTitle: event.target.value });
    }

    handleNewReleaseCatNr = event => {
        this.setState({ newReleaseCatNr: event.target.value });
    }

    handleNewReleasePassword = event => {
        this.setState({ newReleasePassword: event.target.value });
    }

    handleNewReleaseInfoText = event => {
        this.setState({ newReleaseInfoText: event.target.value });
    }

    addRelease = event => {

        let newRelease = {
            user_id: this.state.loggedInUser,
            artist: this.state.newReleaseArtist,
            title: this.state.newReleaseTitle,
            cat_nr: this.state.newReleaseCatNr,
            password: this.state.newReleasePassword,
            info_text: this.state.newReleaseInfoText
        };

        fetch('api/add_release', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRelease),
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="AddRelease">
                <Inputfield 
                    placeholder={'Artist'} 
                    onChange={this.handleNewReleaseArtist}
                />
                <Inputfield 
                    placeholder={'Title'} 
                    onChange={this.handleNewReleaseTitle}
                />
                <Inputfield 
                    placeholder={'Cat nr'} 
                    onChange={this.handleNewReleaseCatNr}
                />
                <Inputfield 
                    placeholder={'Password'} 
                    onChange={this.handleNewReleasePassword}
                />
                <Inputfield 
                    placeholder={'Info text'} 
                    onChange={this.handleNewReleaseInfoText}
                />
                <Button 
                    innerText={'Submit'}
                    onClick={this.addRelease}
                />
            </div>
        );
    }
}

export default AddRelease;