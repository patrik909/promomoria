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
                        {release.cat_number} | {release.artist} - {release.title}
                        <Link to={'/Feedback/' + release.id}>Feedback</Link>
                        <button value={release.id} onClick={this.removeRelease}>Delete</button>
                    </li>
                );
            })
        }

        return (
            <ul>
                {allReleases}
            </ul>
        );
    }
}

export default Feed;