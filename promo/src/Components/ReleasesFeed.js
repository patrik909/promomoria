import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Feed extends Component {

    state = {
        releases: []
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
        event.preventDefault();
        axios.post('api/delete_release', {
            release_id: event.target.value
        }).then(this.fetchAllReleases());      
    }

    render() {
        let allReleases = '';
        if (this.state.releases) {
            allReleases = this.state.releases.map(release => {
                return ( 
                    <li key={release.id}>
                        <div className="ReleaseFeedInfo">
                            {release.cat_number}: {release.artist} - {release.title}
                        </div> 
                        <div className="ReleaseFeedInfo">
                        </div> 
                        <Link to={'/Feedback/' + release.id}>Feedback</Link>
                        <a value={release.id} onClick={this.removeRelease} href="#">Delete</a>
                    </li>
                );
            })
        }

        return (
            <ul className="ReleasesFeed">
                {allReleases}
            </ul>
        );
    }
}

export default Feed;