import React, { Component } from 'react';
import InputField from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';

class AddRelease extends Component {

    state = {
        access: false,
        release: '',
        artist: '',
        feedback: '',
        rating: ''
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

    handleRating = event => {
        this.setState({rating: event.target.value})
    }

    handleArtist = event => {
        this.setState({artist: event.target.value})
    }

    handleFeedback = event => {
        this.setState({feedback: event.target.value})
    }

    addFeedback = () => {
        let feedback = {
            release_id: parseInt(this.props.match.params.id, 10),
            artist_name: this.state.artist,
            feedback: this.state.feedback,
            rating: this.state.rating
        };
        // console.log(release)
        fetch(window.location.origin + '/api/add_feedback', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
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
            {artist} <br /> {title}
            <InputField 
                placeholder={'artist'}
                onChange={this.handleArtist}
            />
            <InputField 
                placeholder={'feedback'}
                onChange={this.handleFeedback}
            />
            <input type="radio" value="1" onClick={this.handleRating} />1
            <input type="radio" value="2" onClick={this.handleRating} />2
            <input type="radio" value="3" onClick={this.handleRating} />3
            <input type="radio" value="4" onClick={this.handleRating} />4
            <input type="radio" value="5" onClick={this.handleRating} />5
            <Button 
                innerText={'OK'}
                onClick={this.addFeedback}
            />
            </div>
        );
    }
}

export default AddRelease;