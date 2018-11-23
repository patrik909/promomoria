import React, { Component } from 'react';
// import Inputfield from '../Components/Parts/Inputfield.js';
// import Button from '../Components/Parts/Button.js';

class AddRelease extends Component {

    state = {
        access: false,
        release: ''
    }
    componentDidMount(){
        console.log(window.location.origin)
        let release = {
            id: parseInt(this.props.match.params.id, 10)
        };
        console.log(release)
        fetch(window.location.origin + '/api/fetch_release', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(release),
        })
        .then(res => res.json())
        .then(release => {
            this.setState({release})
            console.log(this.state.release[0].artist);
        })
        .catch((error) => {
            console.log(error);
        });
    }



    render() {
        let artist = '';
        let title = '';
        if(this.state.release) {
            artist = this.state.release[0].artist
            title = this.state.release[0].title
        }
        
        return (
            <div className="Release">
            {artist} {title}
            </div>
        );
    }
}

export default AddRelease;