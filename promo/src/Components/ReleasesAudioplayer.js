import React, { Component } from 'react';
import PlayIcon from '../Images/play.svg';
import PauseIcon from '../Images/pause.svg';

class Feed extends Component {

    state = {
        tracks: '',
        playTrack: '',
        formatedTrackDuration: '',
        formatedCurrentTime: '',
        currentTime: '',
        duration: '',
        playerAction: 'stop'
    }

    componentDidMount(){
        this.setState({
            tracks: this.props.tracks,
            playTrack: this.props.tracks[0].track_file
        });
        this.handleAudio(this.props.tracks[0].track_file);
    }

    handleTrack = (event) => {
        this.handleAudio(event.target.value);
        this.playAudio();
    }

    handleAudio = track => {
        // Sets track to play.
        this.setState({playTrack: track});
        // Loading the audio.
        this.audio.load();
        // Sets current time for playing track to state.
        this.audio.addEventListener("timeupdate", () => {
            this.setState({
                formatedCurrentTime: this.formatTime(this.audio.currentTime.toFixed(0)),
                currentTime: this.audio.currentTime
            })
        });
        // Sets duration for track to state.
        this.audio.onloadedmetadata = () => {
            this.setState({
                formatedTrackDuration: this.formatTime(this.audio.duration.toFixed(0)),
                duration: this.audio.duration
            })
        }
    }

    formatTime(seconds) {
        // Converts seconds to 0:00  format.
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
            .filter(a => a)
            .join(':')
    }

    handleSeek = event => {
        // Gets the width of process bar.
        const processBarWidth = document.getElementById('ProcessBar').offsetWidth;
        // Calculates the new value for current time.
        const newCurrentTime = event.nativeEvent.offsetX / processBarWidth * this.state.duration;
        this.audio.currentTime = newCurrentTime;
    }

    playAudio = () => {
        this.audio.play();
        this.setState({playerAction: 'play'});
    }

    pauseAudio = () => {
        this.audio.pause();
        this.setState({playerAction: 'pause'});
    }

    stopAudio = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.setState({playerAction: 'stop'});
    }

    render() {
        return ( 
            <div className="Audioplayer">
                <div className="Player">
                    <div className="PlayerButtons">
                        { this.state.playerAction !== 'play' ? ( <button onClick={this.playAudio}><img className="PlayIcon" src={PlayIcon} alt="PlayIcon" /></button> ) : ( <button onClick={this.pauseAudio}><img className="PauseIcon" src={PauseIcon} alt="PauseIcon" /></button> )}
                        <button onClick={this.stopAudio}><div className="StopIcon"></div></button>
                    </div>
                    <div className="PlayerTimeline">
                        <div className="Time">{this.state.formatedCurrentTime}/{this.state.formatedTrackDuration}</div>
                        <div id="ProcessBar" className="ProcessBar" onClick={this.handleSeek}><div className="Processed" style={{width : this.state.currentTime / this.state.duration * 100 + '%'}}></div></div>
                    </div>
                </div>
                <audio className="hide" ref={audio => { this.audio = audio }} controls preload="auto" controlsList="nodownload" >           
                        <source src={window.location.origin +  '/api/tracks/' + this.state.playTrack} type="audio/mpeg" />              
                    </audio>
                <ul className="Playlist">
                    {
                        this.props.tracks.map(track => {
                            return (
                                <li key={track.track_file} className={ track.track_file === this.state.playTrack ? ( 'trackIsPlaying' ) : ( null ) }>
                                    <button value={track.track_file} onClick={this.handleTrack}>{track.track_file.substring(14)}</button>
                                </li>
                            );
                        })
                    }    
                </ul>
            </div>
        );
    }
}

export default Feed;