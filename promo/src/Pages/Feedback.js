import React, { Component } from 'react';
import Header from '../Components/Header.js';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Feedback extends Component {

    state = {
        feedbackData: []
    }

    componentDidMount() {
        axios.post(window.location.origin + '/api/fetch_feedback', {
            release_id: parseInt(this.props.match.params.id, 10) 
        }).then((feedback) => {
            this.setState({feedbackData: feedback.data})
        });
    }

    render() {

        return (
            <div className="Feedback">
                <Header labelName={this.props.userData[0].label_name} />
                <main>
                    <Link to="/"> Back </Link>
                    <ul>
                        {
                            this.state.feedbackData.map(feedback => {
                                return (
                                    <li key={feedback.date}>
                                        artist: {feedback.artist_name} - date: {feedback.date} - rating: {feedback.rating} <br/> <br/>
                                        {feedback.feedback}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </main>
            </div>
        );
    }
}

export default Feedback;