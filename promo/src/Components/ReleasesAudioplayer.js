import React, { Component } from 'react';
import PlayIcon from '../Images/play.svg';
import PauseIcon from '../Images/pause.svg';

class Feed extends Component {

    state = {
        tracks: '',
        playTrack: '',
        trackDuration: '',
        currentTime: '',
        current: '',
        duration: '',
        percent: '',
        playerAction: 'stop'
    }

    componentDidMount(){
        this.setState({
            tracks: this.props.tracks,
            playTrack: this.props.tracks[0].track_file
        });
        this.startAudio(this.props.tracks[0].track_file);
    }

    handleTrack = (event) => {
        this.startAudio(event.target.value);
    }

    startAudio = track => {
        this.setState({playTrack: track});
        // Loading the audio.
        this.audio.load();

        this.audio.addEventListener("timeupdate", () => {
            this.setState({
                currentTime: this.formatTime(this.audio.currentTime.toFixed(0)),
                current: this.audio.currentTime
            })
        });

        this.audio.onloadedmetadata = () => {
            this.setState({
                trackDuration: this.formatTime(this.audio.duration.toFixed(0)),
                duration: this.audio.duration
            })
        }

    }

    formatTime(seconds) {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
            .filter(a => a)
            .join(':')
    }

    handleSeek = event => {
        const processBarWidth = document.getElementById('ProcessBar').offsetWidth;
        const x = this.state.duration / 100
        const y = event.nativeEvent.offsetX / processBarWidth * 100 * x
        console.log(event.nativeEvent.offsetX)
        console.log(processBarWidth)
        this.setState({
            current: y
        })
        this.audio.currentTime = y
}

    playAudio = event => {
        this.audio.play();
        this.setState({playerAction: 'play'});
    }

    pauseAudio = event => {
        this.audio.pause();
        this.setState({playerAction: 'pause'});
    }

    stopAudio = event => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.setState({playerAction: 'stop'});
    }

    render() {
        return ( 
            <div className="Audioplayer">
            {/* <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/494981874&color=%23ff5500&inverse=false&auto_play=false&show_user=true"></iframe> */}
                <div className="Player">
                    <div className="PlayerButtons">
                        { this.state.playerAction !== 'play' ? ( <button onClick={this.playAudio}><img className="PlayIcon" src={PlayIcon} alt="PlayIcon" /></button> ) : ( <button onClick={this.pauseAudio}><img className="PauseIcon" src={PauseIcon} alt="PauseIcon" /></button> )}
                        <button onClick={this.stopAudio}><div className="StopIcon"></div></button>
                    </div>
                    <div className="PlayerTimeline">
                        <div className="Time">{this.state.currentTime}/{this.state.trackDuration}</div>
                        <div id="ProcessBar" className="ProcessBar" onClick={this.handleSeek}><div className="Processed" style={{width : this.state.current / this.state.duration * 100 + '%'}}></div></div>

                    </div>
                    {/* check buffered too? */}
                </div>
                <audio className="hide" ref={audio => { this.audio = audio }} controls preload="auto" controlsList="nodownload" >           
                        <source src={window.location.origin +  '/api/tracks/' + this.state.playTrack} type="audio/mpeg" />              
                    </audio>
                <ul className="Playlist">
                    {
                        this.props.tracks.map(track => {
                            return (
                                <li key={track.track_file} className={ track.track_file === this.state.playTrack ? ( 'trackIsPlaying' ) : ( null ) }>
                                    <button value={track.track_file} onClick={this.handleTrack}>{track.track_file}</button>
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