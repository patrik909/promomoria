import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import ReleasesFeed from '../Components/ReleasesFeed.js';

class Home extends Component {

    render() {
        return (
            <main className="Feed">
                <h3><Link to="/AddRelease" className="AddReleaseLink">+ Add release</Link></h3>
                <ReleasesFeed userId={this.props.userData.id}/>                   
            </main>
        );      
    }
}

export default Home;