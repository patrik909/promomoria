import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';

class AddReleaseInfo extends Component {

    render() {
        return (
            <div className="AddReleaseInfo">
                <p>Fields with * is required</p>
                <Inputfield 
                    className={'full-width'}
                    placeholder={'Artist *'} 
                    onChange={this.props.handleArtist}
                />
                <Inputfield 
                    className={'full-width'}
                    placeholder={'Title *'} 
                    onChange={this.props.handleTitle}
                />
                <div className={'flex'}>
                    <Inputfield 
                        className={'half-width'}
                        placeholder={'Cat nr *'} 
                        onChange={this.props.handleCatNr}
                    />
                    <Inputfield 
                        className={'half-width'}
                        placeholder={'Password *'} 
                        onChange={this.props.handlePassword}
                    />
                </div>
                <div className={'flex'}>
                    <Inputfield 
                        className={'half-width'}
                        placeholder={'Release date'} 
                        onChange={this.props.handleReleaseDate}
                    />
                    <div className="EnableRating half-width flex">
                        <p>Enable rating:</p>
                        <label htmlFor="enable-rating" style={{background : this.props.ratingEnabled ? ( 'rgb(213, 32, 32)' ) : ( null )}}></label>
                        <input type="checkbox" className="hide" id="enable-rating" value={1} onClick={this.props.handleRating} />
                    </div>
                </div>
              
                <textarea
                    className="full-width"
                    placeholder="Info text*"
                    rows="12"
                    maxLength="500"
                    onChange={this.props.handleInfoText}
                ></textarea>
                <p className="UsedCharacters">Used characters: {this.props.infoTextLength} / 500</p>
            </div>
        );
    }
}

export default AddReleaseInfo;