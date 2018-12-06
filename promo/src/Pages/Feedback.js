import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
import FeedbackFeed from '../Components/FeedbackFeed.js';

class Feedback extends Component {

    state = {
        feedbackData: [],
        amountOfFeedback: '',
        averageRating: 0
    }

    componentDidMount() {
        axios.post(window.location.origin + '/api/fetch_feedback', {
            release_id: parseInt(this.props.match.params.id, 10) 
        }).then((feedback) => {
            this.setState({ 
                feedbackData: feedback.data,
                amountOfFeedback: feedback.data.length
            });
            let feedbackSum = 0;
            feedback.data.map(feedback => {
                feedbackSum = feedbackSum + parseInt(feedback.rating)
            });
            this.setState({ averageRating: feedbackSum / feedback.data.length})
        });
    }

    render() {

        return (
            <main className="Feedback Feed">
                <h3><Link to="/"> {'< Back'} </Link></h3>
                <div className="FeedbackInfo">
                    <p>amount of feedback: {this.state.amountOfFeedback || '-'}</p>
                    <p>average rating: {this.state.averageRating || '-'}</p>
                </div>
                <FeedbackFeed feedbackData={this.state.feedbackData}/>
            </main>
        );
    }
}

export default Feedback;