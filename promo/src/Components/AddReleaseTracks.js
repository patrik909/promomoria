import React, { Component } from 'react';
// import Inputfield from '../Components/Parts/Inputfield.js';
// import Button from './Parts/Button.js';
import axios from 'axios';

class AddReleaseTracks extends Component {

    state = {
        trackNames: [],
        loaded: 0,
    }

    addTrack = event => {
        this.setState({loaded: 0})
        let track = event.target.files[0];
        const data = new FormData();
        data.append('track', track, track.name);
            
        axios.post('api/upload_tracks', data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                });
            },
        }).then(response => {
            this.setState({trackNames : [...this.state.trackNames, response.data.trackName]})
        });
    }

    removeTrack = event => {
        axios.post('api/delete_track', {
            trackName: event.target.value
        });
        const trackNames = [...this.state.trackNames];
        const filteredTrackNames = trackNames.filter(track => {
            return track !== event.target.value;
        });
        this.setState({ trackNames: filteredTrackNames });
    }

    render() {
        return (
            <div className="AddReleaseTracks">
            <ul>
            {this.state.trackNames.length !== 0 ? (
                    <div>
                        {this.state.trackNames.map(track => {
                            return <li key={track}>{track}<button onClick={this.removeTrack} value={track}>delete</button></li>
                        })}
                    </div>
                ) : (
                    <div>
                       add a release!
                    </div>
                )}
            </ul>
                <label htmlFor="uploadTrackInput">+</label>
                <div id="artwordProcessBar"><div className="fileProcessed" style={{width : Math.round(this.state.loaded,2) + '%'}}></div> </div>
                <input 
                    type="file" 
                    className="hideInputFile" 
                    id="uploadTrackInput"
                    onChange={this.addTrack} 
                />
            </div>
        );
    }
}

export default AddReleaseTracks;