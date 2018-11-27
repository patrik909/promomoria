import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Feed extends Component {

    state = {
        releases: []
    }

    componentDidMount() {
        axios.post('api/fetch_releases', {
            userId: this.props.userId
        } ).then(releases => {
            this.setState({ releases : releases.data })
        });
    }

    render() {
        let allReleases = '';
        if (this.state.releases) {
            allReleases = this.state.releases.map(release => {
                return ( 
                    <li key={release.id}> 
                        {release.cat_number} | {release.artist} - {release.title}
                        <Link to={'/Feedback/' + release.id}>Feedback</Link>
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