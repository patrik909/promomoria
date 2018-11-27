import React, { Component } from 'react';
import Header from '../Components/Header.js';
import Button from '../Components/Parts/Button.js';
import AddReleaseArtwork from '../Components/AddReleaseArtwork.js';
import AddReleaseTracks from '../Components/AddReleaseTracks.js';
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
        this.setState({releaseArtwork: artworkName})
    }

    render() {
        return (
            <div className="AddRelease">
                <Header labelName={this.props.user[0].label_name} />
                <main>
                    <div className="verticalWrapper">
                        <div className="AddReleaseFiles">
                            <AddReleaseArtwork handleArtworkName={this.handleArtworkName}/>
                            <AddReleaseTracks />
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