import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Button from '../Components/Parts/Button.js';
import Modal from '../Modal.js';
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
        rating: false,
        releaseDate: '',
        releasePassword: '',
        releaseInfoText: '',
        releaseArtwork: '',
        releaseTracks: [],
        redirectTo: false,
        cancelUpload: false,
        modal: 'close',
        addedRelease: {}
    }

    componentDidMount() {
        // Is used to connect uploaded releaes to the users id.
        this.setState({userId: this.props.user.id});
    }

    addRelease = () => { 
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
            // If not empty, add release.
            axios.post('api/add_release', {
                user_id: this.state.userId,
                artist: this.state.releaseArtist,
                title: this.state.releaseTitle,
                cat_nr: this.state.releaseCatNr,
                password: this.state.releasePassword,
                info_text: this.state.releaseInfoText,
                rating: this.state.rating,
                release_date: this.state.releaseDate,
                artwork_name: this.state.releaseArtwork,
                tracks: this.state.releaseTracks,
                    
            }).then((res) => {
                // Open modal and use the new release id to make user able to view release-page.
                this.setState({
                    modal: 'open',
                    addedReleaseId: res.data.insertId
                });
            });
        }
    }

    handleArtistInput = event => {
        // Handling artist input event.
        this.setState({releaseArtist: event.target.value});
    }

    handleTitleInput = event => {
        // Handling title input event.
        this.setState({releaseTitle: event.target.value});
    }

    handleCatNrInput = event => {
        // Handling catalogue number input event.
        this.setState({releaseCatNr: event.target.value});
    }

    handlePasswordInput = event => {
        // Handling release-password input event.
        this.setState({releasePassword: event.target.value});
    }

    handleInfoTextInput = event => {
        // Handling info text input event.
        this.setState({releaseInfoText: event.target.value});
    }

    handleReleaseDateInput = event => {
        // Handling release date input event.
        this.setState({releaseDate: event.target.value});
    }

    handleRatingInput = event => {
        // Handling artist input event.
        if (this.state.rating === false) {
            // Enable rating
            this.setState({rating: event.target.value});
        } else {
            // If enabled, disable.
            this.setState({rating: false});
        }
    }

    handleArtworkName = artworkName => {
        // Handling artwork name.
        this.setState({releaseArtwork: artworkName});
    }

    handleTrackNames = trackNames => {
        // Handling track names.
        this.setState({releaseTracks: trackNames});
    }

    back = () => {
        // Redirect user to startpage.
        this.setState({ redirectTo: '/' });

        if (this.state.releaseTracks.length) {
            // If tracks have been uplaoded, delete.
            axios.delete('api/cancel_upload', {data: {
                file_name: this.state.releaseTracks,
                upload_folder: 'tracks'
            }});         
        }

        if (this.state.releaseArtwork) {
            // If artwork have been uplaoded, delete.
            axios.delete('api/cancel_upload', {data: {
                file_name: this.state.releaseArtwork,
                upload_folder: 'artwork'
            }}); 
        }
    }

    redirect = () => {
        // Redirect user to startpage.
        this.setState({redirectTo: '/'});
    }

    viewRelease = () => {
        // Go to new release.
        this.setState({redirectTo: '/Release/' + this.state.addedReleaseId});
    }

    render() {
        if (this.state.redirectTo !== false ) {
            return <Redirect to={this.state.redirectTo}/>;
        } else {
            return (
                <main className="AddRelease">
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
                            handleReleaseDate={this.handleReleaseDateInput}
                            handleRating={this.handleRatingInput}
                            infoTextLength={this.state.releaseInfoText.length}
                            ratingEnabled={this.state.rating}
                        />
                    </div>
                    <div className="AddReleaseButtons">
                        <Button 
                            className={'half-width'}
                            innerText={'Back'}
                            onClick={this.back}
                        />
                        <Button 
                            className={'half-width'}
                            innerText={'Submit'}
                            onClick={this.addRelease}
                        />
                    </div>
                    <Modal element={document.getElementById('modal')}>
                        <div className={"Modal " + this.state.modal}>
                            <div className="ModalContainer Add">
                                <p>Your release is added!</p>
                                <p><span>{this.state.releaseCatNr}: {this.state.releaseArtist} - {this.state.releaseTitle}</span></p>
                                <div className="LinkPass">
                                    Link: {window.location.origin}/Release/{this.state.addedReleaseId} <br/>
                                    Password: {this.state.releasePassword}
                                </div>
                                <div>
                                    <Button 
                                        innerText={'View'}
                                        onClick={this.viewRelease}
                                    /> 
                                    <Button 
                                        innerText={'Ok'}
                                        onClick={this.redirect}
                                    />                                      
                                </div>
                            </div>
                        </div>
                    </Modal>
                </main>
            );
        }
    }
}

export default AddRelease;