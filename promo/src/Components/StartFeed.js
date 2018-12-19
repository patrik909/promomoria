import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../history';
import Modal from '../Modal';
import Button from './Parts/Button.js';
import axios from 'axios';

class Feed extends Component {

    state = {
        releases: [],
        releaseToDelete: {},
        modal: 'close'
    }

    componentDidMount() {
        // Calling function to fetch all releases for user.
        this.fetchAllReleases();
    }

    fetchAllReleases = () => {
        let query = `?table=releases&column=user_id&search_value=${this.props.userId}&order_by=id`;
        axios.get(`http://www.arsenikrecords.se/express/fetch_all${query}`)
        .then(releases => {
            console.log(releases)
            this.setState({releases : releases.data});
        });     
    }

    removeRelease = () => { 
        axios.delete('http://www.arsenikrecords.se/express/delete_release', {data: {release_id: this.state.releaseToDelete.id}})
        .then(this.fetchAllReleases());
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
        axios.put('http://www.arsenikrecords.se/express/update_release', {
            release_id: event.target.id,
            release_status: status
        }).then(this.fetchAllReleases());  
    }

    feedbackRelease = event => {
        history.push('/Feedback/' + event.target.value);
    }

    updateRelease = event => {
        history.push('/Update/' + event.target.value);
    }

    openModal = event => {
        let query = `?release_id=${event.target.value}`
        axios.get(`http://www.arsenikrecords.se/express/fetch_release${query}`)
        .then(release => {
            // Set useful data to object and open modal.
            this.setState({
                releaseToDelete: {
                    id: release.data[0].id,
                    title: release.data[0].title,
                    artist: release.data[0].artist,
                    cat_number: release.data[0].cat_number
                },
                modal: 'open'     
            });
        }); 
    }

    closeModal = () => { 
        this.setState({
            releaseToDelete: {},
            modal: 'close'               
        });    
    }

    render() {
        return (
            <main className="Start Feed">
                <h3><Link to="/Add" className="AddReleaseLink">+ Add release</Link></h3>
                <ul className="ReleasesFeed">           
                    {
                        this.state.releases ? ( 
                            this.state.releases.map(release => {
                                return ( 
                                    <li key={release.id} className={release.activated === 0 ? ( 'deactivated' ) : ( null )}>
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
                            <p><span>{this.state.releaseToDelete.title} - {this.state.releaseToDelete.artist} {'(' + this.state.releaseToDelete.cat_number + ')'}</span></p>
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

export default Feed;