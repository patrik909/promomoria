import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Modal from '../Modal';
import ModalChild from './ModalChild';
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
        this.fetchAllReleases();
    }

    fetchAllReleases = () => {
        axios.post('api/fetch_releases', {
            userId: this.props.userId
        } ).then(releases => {
            this.setState({ releases : releases.data});
        });      
    }

    removeRelease = event => { 
        axios.post('api/delete_release', {
            release_id: event.target.value
        }).then(this.fetchAllReleases());
            this.setState({
                releaseToDelete: {},
                modal: 'close'               
            });     
    }

    closeModal = event => { 

            this.setState({
                releaseToDelete: {},
                modal: 'close'               
            })    
    }

    statusRelease = event => {
        let status = 0
        if (event.target.value === '0') {
            status = 1
        }
        axios.post('api/status_release', {
            release_id: event.target.id,
            release_status: status
        }).then(this.fetchAllReleases());  
    }

    feedbackRelease = event => {
        this.setState({redirectTo: '/Feedback/' + event.target.value});
    }

    viewRelease = event => {
        this.setState({redirectTo: '/Release/' + event.target.value});
    }

    openRemoveReleaseModal = event => {
        axios.post('/api/fetch_release', {
            release_id: event.target.value
        }).then(release => {
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

    render() {
        console.log(this.state.releaseToDelete)

        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />;
        } else {
            return (
                <ul className="ReleasesFeed">
                
                    {this.state.releases ? ( 
                        this.state.releases.map(release => {
                            return ( 
                                <li key={release.id}>
                                    <div className="ReleaseFeedInfo">
                                        {release.cat_number}: {release.artist} - {release.title}
                                    </div>   
                                    <div className="ReleaseFeedButton">
                                        <Button 
                                            innerText={'View'}
                                            value={release.id}
                                            onClick={this.viewRelease}
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
                                            innerText={'Delete'}
                                            value={release.id}
                                            onClick={this.openRemoveReleaseModal}
                                        />
                                    </div>                                 
                                </li>
                            )
                        })
                    ) : (
                        null
                    )}
                    <Modal 
                   element={
                        document.getElementById('modal')
                    }
                >
                    <div className={"Modal " + this.state.modal}>
                        <div className="ModalContainer">
                            <p>Are you sure that you want to delete;</p>
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
                </ul>
            );
        }
    }
}

export default Feed;