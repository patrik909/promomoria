import React, { Component } from 'react';

class Feed extends Component {

    state = {
        tracks: '',
        playTrack: '',
        trackDuration: '',
        currentTime: '',
        current: '',
        duration: '',
        percent: ''
    }

    componentDidMount(){
        this.setState({
            tracks: this.props.tracks,
            playTrack: this.props.tracks[0].track_file
        });
        this.playTrack(this.props.tracks[0].track_file);
    }

    playTrack = track => {
        console.log(track)

    }

    handleTrack = (event) => {

            this.setState({playTrack: event.target.value});
        // const audio = document.getElementById('audio');
        this.audio.load();
        const audio = this.audio

        this.audio.play();


            this.audio.addEventListener("timeupdate", () => {
                // console.log(this.audio.currentTime)
                // add code here to update the handle position
                //  duration = this.audio.currentTime
                this.setState({
                    currentTime: this.formatTime(this.audio.currentTime.toFixed(0)),
                    current: this.audio.currentTime
                })
                console.log("inne i timeupdate")
              });
 
      
        audio.onloadedmetadata = () => {
            this.setState({
                trackDuration: this.formatTime(audio.duration.toFixed(0)),
                duration: audio.duration
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
        const processBarWidth = document.getElementById('processBar').offsetWidth;
        const x = this.state.duration / 100
        // console.log(x)
        const y = event.nativeEvent.offsetX / processBarWidth * 100 * x
        console.log(event.nativeEvent.offsetX)
        console.log(processBarWidth)
        // console.log(event.nativeEvent.offsetX)
        // console.log(y)
        this.setState({
            current: y
        })
        // console.log(this.state.duration)
        this.audio.currentTime = y
}

    playAudio = event => {
        this.audio.play();
    }

    pauseAudio = event => {
        this.audio.pause();
    }

    render() {
        // console.log(this.state.current / this.state.duration * 100)
        return ( 
            <div className="Audioplayer">
            {/* <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/494981874&color=%23ff5500&inverse=false&auto_play=false&show_user=true"></iframe> */}
                <div className="Player">
                    <button onClick={this.playAudio}>PLAY</button>
                    <button onClick={this.pauseAudio}>PAUSE</button>
                    <div>{this.state.currentTime} / {this.state.trackDuration}</div>
                    {/* check buffered too? */}
                    <div id="processBar" className="processBar" onClick={this.handleSeek}><div className="process" style={{width : this.state.current / this.state.duration * 100 + '%'}}></div></div>
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