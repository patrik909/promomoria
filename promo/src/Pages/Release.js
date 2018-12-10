import React, { Component } from 'react';
import axios from 'axios';
import ReleaseLogin from '../Components/ReleaseLogin.js'
import ReleaseContent from '../Components/ReleaseContent.js'

class Release extends Component {

    state = {
        access: false,
        password: '',
        release: [],
        relesaeTracks : []
    }

    componentDidMount(){

        axios.post(window.location.origin + '/api/fetch_release', {
            release_id: parseInt(this.props.match.params.id, 10)
        }).then(release => {
            this.setState({ release : release.data })
        }); 

        axios.post(window.location.origin + '/api/fetch_release_tracks', {
            release_id: parseInt(this.props.match.params.id, 10)
        }).then(tracks => {
            this.setState({ relesaeTracks : tracks.data })
            console.log(tracks.data)
        });     

        const alreadyGotAccess = JSON.parse(localStorage.getItem(`AccessTo:${parseInt(this.props.match.params.id, 10)}`));
        
        if (alreadyGotAccess === true) {
            this.setState({access: true});
        }
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleAccess = event => {
        if (this.state.password === this.state.release[0].password) {
            this.setState({access: true});
            localStorage.setItem(`AccessTo:${parseInt(this.props.match.params.id, 10)}`, true);
        }
    }

    render(){
        if (this.state.release.length !== 0 && this.state.relesaeTracks.length !== 0) {
            return (
                <div className="Release">
                    {
                        this.state.access === true ? (
                            <ReleaseContent
                                releaseData={this.state.release[0]}
                                tracks={this.state.relesaeTracks}
                            />                         
                        ) : (
                            <ReleaseLogin                     
                                releaseData={this.state.release[0]}
                                handlePassword={this.handlePassword}
                                handleAccess={this.handleAccess}
                            /> 
                        )
                    }
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Release;