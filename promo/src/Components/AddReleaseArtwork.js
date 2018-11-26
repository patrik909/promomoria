import React, { Component } from 'react';

import axios from 'axios';

const BASE_URL = 'api/';
// import Inputfield from '../Components/Parts/Inputfield.js';
// // import Button from '../Components/Parts/Button.js';

class AddReleaseArtwork extends Component {

    state = {
        images: [],
        imageUrls: [],
        loaded: 0
    }

    selectImages = (event) => {
        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        this.setState({ images })

    }
 
uploadImages = () => {
    const uploaders = this.state.images.map(image => {
    const data = new FormData();
    data.append("image", image, image.name);
    
    return axios.post(BASE_URL + 'upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
        .then(response => {
            this.setState({
                imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
            });
        })
    });

    axios.all(uploaders).then(() => {
    console.log('done');
    })
}
    render() {
        return (
            <div>
                <div className="ArtworkUploader">
                    <label for="artwork">Choose a file</label>

                </div>


<input type="file" id="artwork"
onChange={this.selectImages} />
<div> {Math.round(this.state.loaded,2) } %</div>
<button className="btn btn-primary" value="Submit" 
    onClick={this.uploadImages}>Submit</button>
{ 
    this.state.imageUrls.map((url, i) => (
        <div className="col-lg-2" key={i}>
            <img src={BASE_URL + url} className="img-rounded img-responsive"
            alt="not available"/><br/>
        <audio controls controlsList="nodownload">
        <source src={BASE_URL + url} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>

    ))
}             
            </div>

        );
    }
}

export default AddReleaseArtwork;