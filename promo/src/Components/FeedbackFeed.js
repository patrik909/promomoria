import React from 'react';

function FeedbackFeed(props) {
    return (
        <ul className="FeedbackFeed">
            {props.feedbackData.map(feedback => {
                return (
                    <li key={feedback.date}>
                        <div className="FeedbackArtistDate">
                            <p>{feedback.artist_name}</p>
                            <div className="LineSeperator"></div>
                            <p>{feedback.date.replace(/-/g, '/').substring(0,10)}</p>
                        </div>
                        <p className="FeedbackContent">{feedback.feedback}</p>
                        {feedback.rating ? (<p className="FeedbackRating">Rating: {feedback.rating}</p>) : ( null )} 
                    </li>
                )
            })}
        </ul>
    );
}

export default FeedbackFeed;