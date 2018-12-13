import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from '../Modal';
import Button from './Parts/Button.js';
import axios from 'axios';

class Feed extends Component {

    state = {
        releases: [],
        redirectTo: false,
        releaseToDelete: {},
        modal: 'close'
    }

    componentDidMount() {
        // Calling function to fetch all releases for user.
        this.fetchAllReleases();
    }

    fetchAllReleases = () => {
        axios.post('api/fetch_all', {
            // Body values to specify query.
            table: 'releases',
            column: 'user_id',
            additional_query: 'ORDER BY id DESC',
            search_value: this.props.userId
        } ).then(releases => {
            this.setState({releases : releases.data});
        });      
    }

    removeRelease = event => { 
        axios.post('api/delete_release', {
            release_id: event.target.value
        }).then(this.fetchAllReleases());
        // After removing release & fetched releases, clean state and close modal.
        this.closeModal();     
    }

    statusRelease = event => {
        // Status = 0, is deactivated.
        let status = 0
        if (event.target.value === '0') {
            // If status is 0, activate.
            status = 1
        }
        axios.post('api/status_release', {
            release_id: event.target.id,
            release_status: status
        }).then(this.fetchAllReleases());  
    }

    feedbackRelease = event => {
        // Redirect user to feedback-page.
        this.setState({redirectTo: '/Feedback/' + event.target.value});
    }

    updateRelease = event => {
        // Redirect user to feedback-page.
        this.setState({redirectTo: '/Update/' + event.target.value});
    }

    openModal = event => {
        axios.post('/api/fetch_release', {
            release_id: event.target.value
        }).then(release => {
            // Set useful data to object and open modal.
            this.setState({
                releaseToDelete: {
                    id: release.data[0].id,
                    title: release.data[0].title,
                    artist: release.data[0].artist
                },
                modal: 'open'     
            })
        }); 
    }

    closeModal = () => { 
        this.setState({
            releaseToDelete: {},
            modal: 'close'               
        });    
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />;
        } else {
            return (
                <main className="Start Feed">
                    <h3><Link to="/Add" className="AddReleaseLink">+ Add release</Link></h3>
                    <ul className="ReleasesFeed">           
                        {
                            this.state.releases ? ( 
                                this.state.releases.map(release => {
                                    return ( 
                                        <li key={release.id}>
                                            <div className="ReleaseFeedInfo">
                                                {release.cat_number}: {release.artist} - {release.title}
                                            </div>   
                                            <div className="ReleaseFeedButton">
                                                <Button 
                                                    innerText={<Link to={'/Release/' + release.id} target="_blank">View</Link>}
                                                />
                                                <Button 
                                                    innerText={'Feedback'}
                                                    value={release.id}
                                                    onClick={this.feedbackRelease}
                                                />
                                                <Button 
                                                    innerText={release.activated === 1 ? ( 'Deactivate' ) : ( 'Activate' )}
                                                    id={release.id}
                                                    value={release.activated}
                                                    onClick={this.statusRelease}
                                                />
                                                <Button 
                                                    innerText={'Update'}
                                                    value={release.id}
                                                    onClick={this.updateRelease}
                                                />
                                                <Button 
                                                    innerText={'Delete'}
                                                    value={release.id}
                                                    onClick={this.openModal}
                                                />
                                            </div>                                 
                                        </li>
                                    )
                                })
                            ) : (
                                null
                            )
                        }
                    </ul>
                    <Modal element={document.getElementById('modal')}>
                        <div className={"Modal Delete " + this.state.modal}>
                            <div className="ModalContainer">
                                <p>Are you sure that you want to delete</p>
                                <p><span>{this.state.releaseToDelete.title} by {this.state.releaseToDelete.artist}</span></p>
                                <div>
                                    <Button 
                                        innerText={'No'}
                                        onClick={this.closeModal}
                                    />
                                    <Button 
                                        innerText={'Yes'}
                                        value={this.state.releaseToDelete.id}
                                        onClick={this.removeRelease}
                                    />                            
                                </div>
                            </div>
                        </div>
                    </Modal>
                </main>
            );
        }
    }
}

export default Feed;