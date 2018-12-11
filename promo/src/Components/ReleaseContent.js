import React, { Component } from 'react';
import Inputfield from './Parts/Inputfield.js';
import Audioplayer from './ReleasesAudioplayer.js';
import Button from './Parts/Button.js';
import axios from 'axios';
// var saveAs= require('file-saver');


class ReleaseContent extends Component {

    state = {
        artist: '',
        feedback: '',
        rating: '',
        feedbackAdded: false,
        trackplaying: ''
    }

    componentDidMount(){
        const alreadyLeftFeedback = JSON.parse(localStorage.getItem(`FeedbackLeftOn:${parseInt(this.props.releaseData.id, 10)}`));
        
        if (alreadyLeftFeedback === true) {
            this.setState({feedbackAdded: true});
        }
    }

    handlePlayer = event => {
        const audio = document.getElementsByClassName('releaseTrack')[0]
        audio.addEventListener('timeupdate', function(){
            console.log(this.currentTime);
        })
    }

    handleTrack = event => {
        console.log(event.target.value)
    }

    handleRating = event => {
        this.setState({rating: event.target.value})
        console.log(event.target.value)
    }

    handleArtist = event => {
        this.setState({artist: event.target.value})
    }

    handleFeedback = event => {
        this.setState({feedback: event.target.value})
    }

    addFeedback = () => {

        if (
            this.state.artist !== '' &&
            this.state.feedback !== ''
        ) {
            axios.post(window.location.origin + '/api/add_feedback', {
                release_id: this.props.releaseData.id,
                artist: this.state.artist,
                feedback: this.state.feedback,
                rating: this.state.rating
            }).then(res => {
                if (res.data === 'done') {
                    this.setState({ feedbackAdded: true });
                    localStorage.setItem(`FeedbackLeftOn:${parseInt(this.props.releaseData.id, 10)}`, true);
                }
            }); 
        }
    }

    downloadRelease = () => {
        console.log("Ladda ner")
        // axios.post(window.location.origin + '/api/download_release', {
        // }).then(res => {

        //     console.log(res.data);
        //     // 'http://localhost:3000/api/artwork/1544397293164-A_SIDE.jpg'


        //         saveAs('http://localhost:3000/api/artwork/1544397293164-A_SIDE.jpg', "archive.jpg");

        // }); 

    }


    render(){
        return (
            <main className="Release">
                <div className="ReleaseFiles">
                    <div className="ArtworkHolder">
                        <img src={window.location.origin +  '/api/artwork/' + this.props.releaseData.image_file} alt={'Artwork'}  />
                    </div>
                    <Audioplayer tracks={this.props.tracks} />
                </div>
                <div className="ReleaseInfoFeedback">
                    <div className="ReleaseInfo">
                        <div className="ReleaseArtist"><h2>{this.props.releaseData.artist}</h2><div className="LineSeperator"></div></div>
                        <div className="ReleaseTitle"><div className="LineSeperator"></div><h3 className="RecordTitle">{this.props.releaseData.title}</h3></div>
                        <div className="ReleaseInfoText">
                            <p>
                                {this.props.releaseData.info_text.split('\n').map((text, key) => {
                                    return <span key={key}>{text}<br/></span>
                                })}  
                            </p>              
                        </div>
                        {this.props.releaseData.release_date ? ( <h4>Release date: {this.props.releaseData.release_date}</h4>) : (  null )}
                    </div>
                    <div className="ReleaseFeedback">
                        {this.state.feedbackAdded ? (
                            <div className="ThankYou">
                                <p>Thank you for your feedback!</p>
                                <Button
                                    innerText={'Download'}
                                    onClick={this.downloadRelease}
                                />
                            </div>
                        ) : (
                            null
                        )}
                        <Inputfield 
                            className={'full-width'}
                            placeholder={'Artist *'}
                            onChange={this.handleArtist}
                        />
                        <textarea
                            className="full-width"
                            placeholder="Feedback *"
                            rows="6"
                            maxLength="250"
                            onChange={this.handleFeedback}
                        ></textarea>
                        <div className="ReleaseFeedbackBottom">
                            {this.props.releaseData.rating === 1 ? (
                                <div className="Rating half-width">
                                    Rate
                                    <input name="rating" className="hide" type="radio" value="1" id="rating1" onClick={this.handleRating} />
                                    <label htmlFor="rating1" className="RatingCircle"></label>
                                    <input name="rating" className="hide" type="radio" value="2" id="rating2" onClick={this.handleRating} />
                                    <label htmlFor="rating2" className="RatingCircle"></label>
                                    <input name="rating" className="hide" type="radio" value="3" id="rating3" onClick={this.handleRating} />
                                    <label htmlFor="rating3" className="RatingCircle"></label>
                                    <input name="rating" className="hide" type="radio" value="4" id="rating4" onClick={this.handleRating} />
                                    <label htmlFor="rating4" className="RatingCircle"></label>
                                    <input name="rating" className="hide" type="radio" value="5" id="rating5" onClick={this.handleRating} />
                                    <label htmlFor="rating5" className="RatingCircle"></label>
                                </div>                    
                            ) : (
                                <div>{/*Leave empty if there is no rating opt */}</div>
                            )}
                            <div> 
                                <Button 
                                    innerText={'Submit'}
                                    onClick={this.addFeedback}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default ReleaseContent;