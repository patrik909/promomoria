import React, { Component } from 'react';
import axios from 'axios';

class AddReleaseTracks extends Component {

    state = {
        trackNames: [],
        loaded: 0,
        message: ''
    }

    addTrack = event => {
        this.setState({ loaded: 0 })
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
            this.props.handleTrackNames(this.state.trackNames)
            this.setState({
                loaded: 0,
                message: ''
            });
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
        this.props.handleTrackNames(this.state.trackNames)
    }

    moveDownTrack = event => {
        const trackNames = [...this.state.trackNames]

        const currentIndex = event.target.id;
        const newIndex = event.target.id-1;
        const trackName = event.target.value;
        trackNames.splice(currentIndex, 1);
        trackNames.splice(newIndex, 0, trackName)

        this.setState({ trackNames });
        this.props.handleTrackNames(trackNames)
    }

    moveUpTrack = event => {
        const trackNames = [...this.state.trackNames]

        const currentIndex = event.target.id;
        const newIndex = event.target.id+1;
        const trackName = event.target.value;
        trackNames.splice(currentIndex, 1);
        trackNames.splice(newIndex, 0, trackName);
        
        this.setState({ trackNames });
        this.props.handleTrackNames(trackNames)
    }

    render() {
        return (
            <div className="AddReleaseTracks">
                <div className="TrackUploader">
                    {
                        this.state.loaded === 0 || this.state.loaded === 100 ? (
                            <label className="AddTrack" htmlFor="uploadTrackInput"><p>+ Add track</p></label> 
                        ) : (
                            <label><p>Wait til track is uplaoded to add a new one</p></label> 
                        ) 
                    }
                    <p className="helper">Name the tracks as you want to display them</p>
                    <div className="TrackProcessBar"><div className="FileProcessed" style={{width : Math.round(this.state.loaded,2) + '%'}}></div> </div>
                    <input 
                        type="file" 
                        className="hideInputFile" 
                        id="uploadTrackInput"
                        onChange={this.addTrack} 
                    />
                </div>
                <ul className="TrackList">
                    {
                        this.state.trackNames.length !== 0 ? (
                            <div>
                                {this.state.trackNames.map((track, index) => {
                                    const trackName = track.substring(14);
                                    return (
                                        <li key={index}>
                                            <p>{index + 1 + '. ' + trackName}</p>
                                            <button onClick={this.moveDownTrack} value={track} id={index}>DOWN</button>
                                            <button onClick={this.moveUpTrack} value={track} id={index}>UP</button>
                                            <button onClick={this.removeTrack} value={track}>Delete</button>
                                        </li>
                                    )
                                })}
                            </div>
                        ) : (
                            null
                        )
                    }
                </ul> 
            </div>
        );
    }
}

export default AddReleaseTracks;