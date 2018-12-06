import React, { Component } from 'react';
import Header from '../Components/Header.js';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";

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
            <div>
                <main className="Feedback">
                    <Link to="/"> {'< Back'} </Link>
                    <div>
                        <p>amount of feedback: {this.state.amountOfFeedback}</p>
                        <p>average rating: {this.state.averageRating}</p>
                    </div>
                    <ul className="FeedbackFeed">
                        {
                            this.state.feedbackData.map(feedback => {
                                return (
                                    <li key={feedback.date}>
                                        <div className="top">
                                            <p>{feedback.artist_name}</p>
                                            <div className="LineSeperator"></div>
                                            <p>{feedback.date.replace(/-/g, '/').substring(0,9)}</p>
                                        </div> <br/>
                                        {feedback.feedback} <br/> <br/>
                                        rating: {feedback.rating} <br/> <br/>
                                      
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