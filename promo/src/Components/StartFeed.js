import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Button from './Parts/Button.js';
import axios from 'axios';

class Feed extends Component {

    state = {
        releases: [],
        redirectTo: false
    }

    componentDidMount() {
        this.fetchAllReleases();
    }

    fetchAllReleases = () => {
        axios.post('api/fetch_releases', {
            userId: this.props.userId
        } ).then(releases => {
            this.setState({ releases : releases.data })
        });      
    }

    removeRelease = event => { 
        axios.post('api/delete_release', {
            release_id: event.target.value
        }).then(this.fetchAllReleases());      
    }

    statusRelease = event => {
        let status = 0
        if (event.target.value === '0') {
            status = 1
        }
        axios.post('api/status_release', {
            release_id: event.target.id,
            release_status: status
        }).then(this.fetchAllReleases());  
    }

    feedbackRelease = event => {
        this.setState({redirectTo: event.target.value});
        console.log(event.target.value)
    }

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={'/Feedback/' + this.state.redirectTo} />;
        } else {
            return (
                <ul className="ReleasesFeed">
                    {this.state.releases ? ( 
                        this.state.releases.map(release => {
                            return ( 
                                <li key={release.id}>
                                    <div className="ReleaseFeedInfo">
                                        {release.cat_number}: {release.artist} - {release.title}
                                    </div>   
                                    <div className="ReleaseFeedButton">
                                        <Button 
                                            innerText={'Feedback'}
                                            value={release.id}
                                            onClick={this.feedbackRelease}
                                        />
                                        <Button 
                                            innerText={release.activated === 1 ? ( 'Deactivate' ) : ( 'Activate' )}
                                            id={release.id}
                                            value={release.activated}
                                            onClick={this.statusRelease}
                                        />
                                        <Button 
                                            innerText={'Delete'}
                                            value={release.id}
                                            onClick={this.removeRelease}
                                        />
                                    </div>                                 
                                </li>
                            )
                        })
                    ) : (
                        null
                    )}
                </ul>
            );
        }
    }
}

export default Feed;