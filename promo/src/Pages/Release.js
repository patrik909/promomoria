import React, { Component } from 'react';
import axios from 'axios';

class Release extends Component {

    state = {
    }
    componentDidMount(){
        axios.post('api/fetch_release', {
            release_id: parseInt(this.props.match.params.id, 10)
        } ).then(releases => {
            this.setState({ releases : releases.data })
        });  
    }

    render() {

        return (
            <div className="Release">

            </div>
        );
    }
}

export default Release;