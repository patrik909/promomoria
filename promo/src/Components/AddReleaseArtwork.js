import React, { Component } from 'react';
import Button from '../Components/Parts/Button.js';
import axios from 'axios';

class AddReleaseArtwork extends Component {

    state = {
        imageName: '',
        imageUrl: '',
        loaded: 0
    }

    addArtwork = event => {

        let image = event.target.files[0];
        const data = new FormData();
        data.append('artwork', image, image.name);
            
        axios.post('api/upload_artwork', data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                });
            },
        }).then(response => {
            this.setState({
                imageUrl: response.data.imageUrl,
                imageName: response.data.imageName
            });
            this.props.handleArtworkName(this.state.imageName)
        });
    }

    removeArtwork = () => {
        axios.post('api/delete_artwork', {
            imageName: this.state.imageName
        });
        this.setState({
            imageUrl: '',
            imageName: '',
            loaded: 0
        });
        this.props.handleArtworkName(this.state.imageName)
    }

    render() {
  
        return (
            <div className="ArtworkUploader">
                {this.state.imageUrl ? (
                    <div className="ArtworkHolder">
                        <img src={this.state.imageUrl ? 'api/' + this.state.imageUrl : null} alt="Release Artwork" /> 
                        <Button 
                            innerText={'Delete'}
                            onClick={this.removeArtwork}
                        />
                    </div>
                ) : (
                    <div className="center column">
                        <label htmlFor="uploadArtworkInput">Choose a file</label>
                        <div id="artworkProcessBar"><div className="fileProcessed" style={{width : Math.round(this.state.loaded,2) + '%'}}></div> </div>
                    </div>
                )}
                <input 
                    type="file" 
                    className="hideInputFile" 
                    id="uploadArtworkInput"
                    onChange={this.addArtwork} 
                />
            </div>
        );
    }
}

export default AddReleaseArtwork;