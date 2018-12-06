import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";

function FeedbackFeed(props) {

        return (
            <ul className="FeedbackFeed">
                {props.feedbackData.map(feedback => {
                    return (
                        <li key={feedback.date}>
                            <div className="FeedbackArtistDate">
                                <p>{feedback.artist_name}</p>
                                <div className="LineSeperator"></div>
                                <p>{feedback.date.replace(/-/g, '/').substring(0,9)}</p>
                            </div>
                            <p className="FeedbackContent">{feedback.feedback}</p>
                            <p className="FeedbackRating">Rating: {feedback.rating}</p>
                        </li>
                    )
                })}

            </ul>
        );
}

export default FeedbackFeed;