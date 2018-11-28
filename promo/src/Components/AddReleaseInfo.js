import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';

class AddReleaseInfo extends Component {

    render() {
        return (
            <div className="AddReleaseInfo">
                <Inputfield 
                    placeholder={'Artist'} 
                    onChange={this.props.handleArtist}
                    
                />
                <Inputfield 
                    placeholder={'Title'} 
                    onChange={this.props.handleTitle}
                />
                <Inputfield 
                    placeholder={'Cat nr'} 
                    onChange={this.props.handleCatNr}
                />
                <Inputfield 
                    placeholder={'Password'} 
                    onChange={this.props.handlePassword}
                />
                enable rating <input type="radio" value={1} onClick={this.props.handleRating} /> 
                <textarea
                    placeholder="Info text"
                    onChange={this.props.handleInfoText}
                    onKeyDown={this.props.handleInfoText}
                ></textarea>
            </div>
        );
    }
}

export default AddReleaseInfo;