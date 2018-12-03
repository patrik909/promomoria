import React, { Component } from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';
import axios from 'axios';

const JSZip = require("jszip");

class ReleaseContent extends Component {

    state = {
        artist: '',
        feedback: '',
        rating: '',
        feedbackAdded: false
    }

    componentDidMount(){
    }

    handleRating = event => {
    	this.setState({rating: event.target.value})
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
                }
                // this.setState.({})
                console.log(res.data)
            }); 
        }
    }


    render(){
        console.log(this.state.feedbackAdded)
        return (
            <div className="ReleaseContent verticalWrapper">
                <div>
                    <div>
                        <img src={window.location.origin +  '/api/artwork/' + this.props.releaseData.image_file} alt={'Artwork'} />
                    </div>
                    <div>
                        {
                            this.props.tracks.map(track => {
                                return (
                                    <audio controls preload="auto" key={track.track_file}>
                                        <source src={window.location.origin +  '/api/tracks/' + track.track_file} type="audio/mpeg" />
                                    </audio>
                                );
                            })
                        }
                    </div>
                </div>
                <div>
                    artist: {this.props.releaseData.artist} <br/>
                    title: {this.props.releaseData.title} <br/>
                    cat nr: {this.props.releaseData.cat_number} <br/>
                    text: <br/> 
                    {this.props.releaseData.info_text.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>
                    })} 
                    <br/>
                    {
                        this.state.feedbackAdded === true ? (
                            <div>
                                THANK YOU!!
                                <Button 
                                    innerText={'download'}
                                    onClick={this.downloadRelease}
                                />
                            </div>
                        ) : (
                            <div>

                            {
                                this.props.releaseData.rating === 1 ? (
                                    <div>
                                        <input type="radio" value="1" onClick={this.handleRating} />1
                                        <input type="radio" value="2" onClick={this.handleRating} />2
                                        <input type="radio" value="3" onClick={this.handleRating} />3
                                        <input type="radio" value="4" onClick={this.handleRating} />4
                                        <input type="radio" value="5" onClick={this.handleRating} />5 
                                    </div>                    
                                ) : (
                                    null
                                )
                            }
                            <Inputfield 
                                placeholder={'artist'}
                                onChange={this.handleArtist}
                            />
                            <Inputfield 
                                placeholder={'feedback'}
                                onChange={this.handleFeedback}
                            />
                            <Button 
                                innerText={'OK'}
                                onClick={this.addFeedback}
                            />
                        </div>
                        )
                    }
            </div>    
            </div>
        );
    }
}

export default ReleaseContent;