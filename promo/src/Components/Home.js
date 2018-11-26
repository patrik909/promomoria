import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../Components/Header.js';
import ReleasesFeed from '../Components/ReleasesFeed.js';

class Home extends Component {

    state = {
    }

    render() {
        return (
            <div className="Home">
                <Header labelName={this.props.userData[0].label_name} />
                <main>
                    <Link to="/AddRelease">+ Add release</Link>
                    <ReleasesFeed userId={this.props.userData[0].id}/>                   
                </main>
            </div>
        );      
    }
}

export default Home;