import React from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';

function AddReleaseInfo(props) {

    return (
        <div className="AddReleaseInfo">
            <p className="helper">Fields with * is required</p>
            <Inputfield 
                className={'full-width'}
                placeholder={'Artist *'} 
                onChange={props.handleArtist}
            />
            <Inputfield 
                className={'full-width'}
                placeholder={'Title *'} 
                onChange={props.handleTitle}
            />
            <div className={'flex'}>
                <Inputfield 
                    className={'half-width'}
                    placeholder={'Cat nr *'} 
                    onChange={props.handleCatNr}
                />
                <Inputfield 
                    className={'half-width'}
                    placeholder={'Password *'} 
                    onChange={props.handlePassword}
                />
            </div>
            <div className={'flex'}>
                <Inputfield 
                    className={'half-width'}
                    placeholder={'Release date'} 
                    onChange={props.handleReleaseDate}
                />
                <div className="EnableRating half-width flex">
                    <p>Enable rating:</p>
                    <label htmlFor="enable-rating" style={{background : props.ratingEnabled ? ( 'rgb(213, 32, 32)' ) : ( null )}}></label>
                    <input type="checkbox" className="hide" id="enable-rating" value={1} onClick={props.handleRating} />
                </div>
            </div>
            
            <textarea
                className="full-width"
                placeholder="Info text *"
                rows="12"
                maxLength="500"
                onChange={props.handleInfoText}
            ></textarea>
            <p className="UsedCharacters">Used characters: {props.infoTextLength} / 500</p>
        </div>
    );
    
}

export default AddReleaseInfo;