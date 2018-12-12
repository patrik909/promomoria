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
        // Fetch all feedback for for release by url param.
        axios.post(window.location.origin + '/api/fetch_feedback', {
            release_id: parseInt(this.props.match.params.id, 10) 
        }).then((feedback) => {
            // Setting feedback data and amount of feedback to state.
            this.setState({ 
                feedbackData: feedback.data,
                amountOfFeedback: feedback.data.length
            });

            let feedbackSum = 0;
            // Looping all feedback.
            feedback.data.map(feedback => {
                // Converting rating value to number from string.
                const rating = parseInt(feedback.rating);
                // If rating is a number.
                if (!isNaN(rating)) {
                    feedbackSum = feedbackSum + parseInt(rating)
                }
            });
            // Set state for average rating.
            this.setState({ averageRating: feedbackSum / feedback.data.length})
        });
    }

    render() {

        return (
            <main className="Feedback Feed">
                <div className="FeedbackInfo">
                    <p>amount of feedback: {this.state.amountOfFeedback || '-'}</p>
                    <p>average rating: { this.state.averageRating ? ( this.state.averageRating.toFixed(1) ) : ( '-' )}</p>
                </div>
                <FeedbackFeed feedbackData={this.state.feedbackData}/>
                <h3><Link to="/"> {'< Back'} </Link></h3>
            </main>
        );
    }
}

export default Feedback;