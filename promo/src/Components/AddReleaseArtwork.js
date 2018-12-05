import React, { Component } from 'react';
import Button from '../Components/Parts/Button.js';
import axios from 'axios';

class AddReleaseArtwork extends Component {

    state = {
        imageName: '',
        imageUrl: '',
        loaded: 0,
        message: ''
    }

    checkArtwork = event => {
        let image = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
              var img = new Image;
              img.onload = () => {
                  if ( img.width > 1399 && img.height > 1399 ) {
                    this.addArtwork(image);
                    this.setState({ message: '' })
                  } else {
                    this.setState({ message: 'Artwork is to small!' })
                  }
                console.log(img.width);
                console.log(img.height);
              };
              img.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
          }
        
    }

    addArtwork = image => {
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
                <p className="helper">Image have to be 1400x1400px or larger</p>
                <div className="ArtworkHolder">
                    {
                        !this.state.imageUrl ? (
                            <div>
                                <label htmlFor="uploadArtworkInput" className="ArtworkFileInput">
                                    <div className="ArtworkPlaceholderIcon"><div className="CenterHole"></div></div>
                                    <p>Choose artwork file</p>
                                    {
                                        this.state.message ? (
                                            <p className="ToSmallImage">{this.state.message}</p>
                                        ) : ( null )
                                    }
                                </label>
                                <input 
                                    type="file" 
                                    className="hideInputFile" 
                                    id="uploadArtworkInput"
                                    onChange={this.checkArtwork} 
                                />
                                <div className="ArtworkProcessBar">
                                    <div className="FileProcessed" style={{ width : Math.round(this.state.loaded, 2) + '%' }}></div> 
                                </div>
                            </div>
                        ) : (
                            <div className="ArtworkImage" style={{width: '100%', height: '100%', overflow:'hidden', position:'relative'}}>
                                <img src={this.state.imageUrl ? 'api/' + this.state.imageUrl : null} alt="Release Artwork" style={{width: '100%', position: ' absolute'}}/>
                                <Button 
                                    className={'DeleteArtwork'}
                                    innerText={'X'}
                                    onClick={this.removeArtwork}
                                /> 
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default AddReleaseArtwork;