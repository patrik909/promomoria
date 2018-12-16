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
        let query = `?release_id=${parseInt(this.props.match.params.id, 10)}`
        axios.get(`${window.location.origin}/api/fetch_release${query}`)
        .then(release => {
            let tracks = release.data[0].files.split('|')
            this.setState({
                release :release.data[0],
                relesaeTracks: tracks
            });
        }); 

        const alreadyGotAccess = JSON.parse(localStorage.getItem(`AccessTo:${parseInt(this.props.match.params.id, 10)}`));     
        if (alreadyGotAccess === true) {
            this.setState({access: true});
        }
    }

    handlePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleAccess = () => {
        if (this.state.password === this.state.release.password) {
            this.setState({access: true});
            localStorage.setItem(`AccessTo:${parseInt(this.props.match.params.id, 10)}`, true);
        }
    }

    render(){
        if (this.state.release) {
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
        } else {
            return null;
        }
    }
}

export default Release;