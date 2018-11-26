import React, { Component } from 'react';
import Header from '../Components/Header.js';
import Button from '../Components/Parts/Button.js';
import AddReleaseArtwork from '../Components/AddReleaseArtwork.js';
import AddReleaseInfo from '../Components/AddReleaseInfo.js';
import axios from 'axios';

class AddRelease extends Component {

    state = {
        userId: '',
        releaseArtist: 'Artist',
        releaseTitle: 'Titel EP',
        releaseCatNr: 'ABC000',
        releasePassword: 'pass',
        releaseInfoText: 'infotext',
        releaseArtwork: ''
    }

    componentDidMount() {
        // Adding logged in user's id to state.
        this.setState({ userId: this.props.user[0].id });
    }

    addRelease = event => {
        axios.post('api/add_release', {
            user_id: this.state.userId,
            artist: this.state.releaseArtist,
            title: this.state.releaseTitle,
            cat_nr: this.state.releaseCatNr,
            password: this.state.releasePassword,
            info_text: this.state.releaseInfoText,
            artwork_name: this.state.releaseArtwork
        });
    }

    handleArtworkName = artworkName => {
        this.setState({ releaseArtwork: artworkName});
    }

    handleReleaseArtist = event => {
        this.setState({ newReleaseArtist: event.target.value });
    }

    handleReleaseTitle = event => {
        this.setState({ newReleaseTitle: event.target.value });
    }

    handleReleaseCatNr = event => {
        this.setState({ newReleaseCatNr: event.target.value });
    }

    handleReleasePassword = event => {
        this.setState({ newReleasePassword: event.target.value });
    }

    handleReleaseInfoText = event => {
        this.setState({ newReleaseInfoText: event.target.value });
    }

    render() {
        return (
            <div className="AddRelease">
                <Header labelName={this.props.user[0].label_name} />
                <main>
                    <div className="verticalWrapper">
                        <div className="AddReleaseFiles">
                            <AddReleaseArtwork handleArtworkName={this.handleArtworkName}/>
                            {/*<AddTracks /> */}
                        </div>
                        
                        <AddReleaseInfo />
                    </div>
                    <Button 
                        innerText={'Submit release'}
                        onClick={this.addRelease}
                    />
                </main>
            </div>
        );
    }
}

export default AddRelease;