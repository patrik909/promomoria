import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Header from '../Components/Header.js';
import Button from '../Components/Parts/Button.js';
import AddReleaseArtwork from '../Components/AddReleaseArtwork.js';
import AddReleaseTracks from '../Components/AddReleaseTracks.js';
import AddReleaseInfo from '../Components/AddReleaseInfo.js';
import axios from 'axios';

class AddRelease extends Component {

    state = {
        userId: '',
        releaseArtist: '',
        releaseTitle: '',
        releaseCatNr: '',
        releasePassword: '',
        releaseInfoText: '',
        releaseArtwork: '',
        releaseTracks: [],
        redirect: false,
        cancelUpload: false
    }

    componentDidMount() {
        this.setState({ userId: this.props.user[0].id });
    }

    addRelease = event => {
        if(
            this.state.userId !== '' &&
            this.state.releaseArtist !== '' &&
            this.state.releaseTitle !== '' &&
            this.state.releaseCatNr !== '' &&
            this.state.releasePassword !== '' &&
            this.state.releaseInfoText !== '' &&
            this.state.releaseArtwork !== '' &&
            this.state.releaseTracks !== ''
        ) {
            axios.post('api/add_release', {
                user_id: this.state.userId,
                artist: this.state.releaseArtist,
                title: this.state.releaseTitle,
                cat_nr: this.state.releaseCatNr,
                password: this.state.releasePassword,
                info_text: this.state.releaseInfoText,
                artwork_name: this.state.releaseArtwork,
                tracks: this.state.releaseTracks,
                    
            }).then(() => {
                this.setState({redirect: true})
            });
        }
    }

    handleArtistInput = event => {
        this.setState({ releaseArtist: event.target.value });
    }

    handleTitleInput = event => {
        this.setState({ releaseTitle: event.target.value });
    }

    handleCatNrInput = event => {
        this.setState({ releaseCatNr: event.target.value });
    }

    handlePasswordInput = event => {
        this.setState({ releasePassword: event.target.value });
    }

    handleInfoTextInput = event => {
        this.setState({ releaseInfoText: event.target.value});
    }

    handleArtworkName = artworkName => {
        this.setState({releaseArtwork: artworkName})
    }

    handleTrackNames = trackNames => {
        this.setState({releaseTracks: trackNames})
    }

    back = () => {
        this.setState({ redirect: true })
        // Remove files too.
    }

    render() {

        if (this.state.redirect === true ) {
            return <Redirect to="/"/>;
        } else {
            return (
                <div className="AddRelease">
                    <Header labelName={this.props.user[0].label_name} />
                    <main>
                        <div className="verticalWrapper">
                            <div className="AddReleaseFiles">
                                <AddReleaseArtwork handleArtworkName={this.handleArtworkName} />
                                <AddReleaseTracks handleTrackNames={this.handleTrackNames} />
                            </div>
                            
                            <AddReleaseInfo 
                                handleArtist={this.handleArtistInput}
                                handleTitle={this.handleTitleInput}
                                handleCatNr={this.handleCatNrInput}
                                handlePassword={this.handlePasswordInput} 
                                handleInfoText={this.handleInfoTextInput}
                            />
                        </div>
                       <p> {this.state.releaseInfoText} </p>
                       <Button 
                            innerText={'Back'}
                            onClick={this.back}
                        />
                        <Button 
                            innerText={'Submit release'}
                            onClick={this.addRelease}
                        />
                    </main>
                </div>
            );
        }
    }
}

export default AddRelease;