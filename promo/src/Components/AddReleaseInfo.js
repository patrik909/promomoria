import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
// import Button from '../Components/Parts/Button.js';

class AddReleaseInfo extends Component {

    render() {
        return (
            <div className="AddReleaseInfo">
                <Inputfield 
                    placeholder={'Artist'} 
                    onChange={this.handleNewReleaseArtist}
                />
                <Inputfield 
                    placeholder={'Title'} 
                    onChange={this.handleNewReleaseTitle}
                />
                <Inputfield 
                    placeholder={'Cat nr'} 
                    onChange={this.handleNewReleaseCatNr}
                />
                <Inputfield 
                    placeholder={'Password'} 
                    onChange={this.handleNewReleasePassword}
                />
                <Inputfield 
                    placeholder={'Info text'} 
                    onChange={this.handleNewReleaseInfoText}
                />
            </div>
        );
    }
}

export default AddReleaseInfo;