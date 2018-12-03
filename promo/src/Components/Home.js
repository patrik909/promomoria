import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../Components/Header.js';
import ReleasesFeed from '../Components/ReleasesFeed.js';

class Home extends Component {

    state = {
    }

    render() {
        return (
            <div>
                <Header labelName={this.props.userData.label_name} />
                <main className="Home">
                    <Link to="/AddRelease" className="AddReleaseLink">+ Add release</Link>
                    <ReleasesFeed userId={this.props.userData.id}/>                   
                </main>
            </div>
        );      
    }
}

export default Home;