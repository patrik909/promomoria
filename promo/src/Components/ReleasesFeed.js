import React, { Component } from 'react';
import axios from 'axios';
import Button from './Parts/Button.js';

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
                        <Button 
                            innerText={'Feedback'}
                        />
                        <Button 
                            innerText={'Delete'}
                        />
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