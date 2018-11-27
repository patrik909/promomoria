import React, { Component } from 'react';
import Header from '../Components/Header.js';
import axios from 'axios';
// import InputField from '../Components/Parts/Inputfield.js';
// import Button from '../Components/Parts/Button.js';

class Feedback extends Component {

    componentDidMount() {
        axios.post(window.location.origin + '/api/fetch_feedback', {
            release_id: parseInt(this.props.match.params.id, 10) 
        }).then((result) => {
            console.log(result.data);
        });
    }



    render() {

        return (
            <div className="Feedback">
                <Header labelName={this.props.userData[0].label_name} />
            </div>
        );
    }
}

export default Feedback;