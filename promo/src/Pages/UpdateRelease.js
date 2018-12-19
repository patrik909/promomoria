import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Button from '../Components/Parts/Button.js';
import UpdateReleaseInfo from '../Components/UpdateReleaseInfo.js';
import axios from 'axios';

class UpdateRelease extends Component {

    state = {
        releaseId: '',
        releaseArtist: '',
        releaseTitle: '',
        releaseCatNr: '',
        rating: false,
        releaseDate: '',
        releasePassword: '',
        releaseInfoText: '',
        redirectTo: false
    }

    componentDidMount() {
        let query = `?release_id=${parseInt(this.props.match.params.id, 10)}`
        axios.get(`${window.location.origin}/api/fetch_release${query}`)
        .then((release) => {
            this.setState({
                releaseId: release.data[0].id,
                releaseArtist: release.data[0].artist,
                releaseTitle: release.data[0].title,
                releaseCatNr: release.data[0].cat_number,
                rating: release.data[0].rating,
                releaseDate: release.data[0].release_date,
                releasePassword: release.data[0].password,
                releaseInfoText: release.data[0].info_text
            });
        });
    }

    updateRelease = () => {
        axios.put(window.location.origin + '/api/update_release', {
            release_id: parseInt(this.state.releaseId, 10),
            artist: this.state.releaseArtist,
            title: this.state.releaseTitle,
            cat_nr: this.state.releaseCatNr,
            rating: this.state.rating,
            release_date: this.state.releaseDate,
            password: this.state.releasePassword,
            info_text: this.state.releaseInfoText
        }).then(success => {
            if (success.data === true) {
                this.redirect();
            }
        });
    }

    handleArtistInput = event => {
        this.setState({releaseArtist: event.target.value});
    }

    handleTitleInput = event => {
        this.setState({releaseTitle: event.target.value});
    }

    handleCatNrInput = event => {
        this.setState({releaseCatNr: event.target.value});
    }

    handlePasswordInput = event => {
        this.setState({releasePassword: event.target.value});
    }

    handleInfoTextInput = event => {
        this.setState({releaseInfoText: event.target.value});
    }

    handleReleaseDateInput = event => {
        this.setState({releaseDate: event.target.value});
    }

    handleRatingInput = event => {
        if (this.state.rating === false) {
            this.setState({rating: event.target.value});
        } else {
            this.setState({rating: false});
        }
    }

    redirect = () => {
        this.setState({redirectTo: '/'});
    }

    render() {

        if (this.state.redirectTo !== false) {
            return <Redirect to={this.state.redirectTo}/>;
        } else if (this.state.releaseId !== '') {
            return (
                <main className="UpdateRelease">
                    <div className="verticalWrapper">
                        <div className="UpdateReleaseFiles">
                            <p>For updating files<br/>Please redo the uploading process<br/>and delete this version</p> 
                        </div>                        
                        <UpdateReleaseInfo 
                            handleArtist={this.handleArtistInput}
                            handleTitle={this.handleTitleInput}
                            handleCatNr={this.handleCatNrInput}
                            handlePassword={this.handlePasswordInput} 
                            handleInfoText={this.handleInfoTextInput}
                            handleReleaseDate={this.handleReleaseDateInput}
                            handleRating={this.handleRatingInput}
                            infoTextLength={this.state.releaseInfoText.length}
                            ratingEnabled={this.state.rating}
                            setArtist={this.state.releaseArtist}
                            setTitle={this.state.releaseTitle}
                            setCatNr={this.state.releaseCatNr}
                            setPassword={this.state.releasePassword}
                            setReleaseDate={this.state.releaseDate}
                            setInfoText={this.state.releaseInfoText}
                            setRating={this.state.rating}
                        />
                    </div>
                    <div className="AddReleaseButtons">
                        <Button 
                            className={'half-width'}
                            innerText={'Back'}
                            onClick={this.redirect}
                        />
                        <Button 
                            className={'half-width'}
                            innerText={'Update'}
                            onClick={this.updateRelease}
                        />
                    </div>
                </main>
            );
        } else {
            return null
        }
    }
}

export default UpdateRelease;