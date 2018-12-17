import React, { Component } from 'react';
import axios from 'axios';
import ReleaseLogin from '../Components/ReleaseLogin.js'
import ReleaseContent from '../Components/ReleaseContent.js'

class Release extends Component {

    state = {
        access: false,
        label: '',
        password: '',
        release: [],
        relesaeTracks : []
    }

    componentDidMount(){
        const query = `?release_id=${parseInt(this.props.match.params.id, 10)}`
        axios.get(`${window.location.origin}/api/fetch_release${query}`)
        .then(release => {
            if (release.data[0]) {
                // Response gives you a string of tracks, which is separated by '|'.
                const tracks = release.data[0].files.split('|');
                // Add the release data to state.
                this.setState({
                    release :release.data[0],
                    relesaeTracks: tracks
                });                
            }
        }); 
        const alreadyGotAccess = JSON.parse(localStorage.getItem(`AccessTo:${parseInt(this.props.match.params.id, 10)}`));     
        if (alreadyGotAccess === true) {
            // If access data is added to localStorage,'Redirect' to ReleaseContent.
            this.setState({access: true});
        }
    }

    handlePassword = event => {
        // Handles visitors password, password to access the ReleaseContent.
        this.setState({password: event.target.value});
    }

    handleAccess = () => {
        if (this.state.password === this.state.release.password) {
            // If the input- and release-password matched, set access to state and add access data to localStorage.
            this.setState({access: true});
            // This is used to make the visitor skip the 'login'/access part of this page.
            localStorage.setItem(`AccessTo:${parseInt(this.props.match.params.id, 10)}`, true);
        }
    }

    render(){
        return (
            <React.Fragment>
                {
                    this.state.release.activated === 1 ? (
                        this.state.access === true ? (
                            <ReleaseContent
                                releaseData={this.state.release}
                                tracks={this.state.relesaeTracks}
                            />                         
                        ) : (
                            <ReleaseLogin                     
                                releaseData={this.state.release}
                                labelName={this.state.release.label_name}
                                handlePassword={this.handlePassword}
                                handleAccess={this.handleAccess}
                            /> 
                        )                          
                    ) : (
                        <main className="NotAvailable">
                            <h3>This release<br />is not available<br />at the moment</h3>
                        </main>                           
                    )
                }
            </React.Fragment>
        );
    }
}

export default Release;