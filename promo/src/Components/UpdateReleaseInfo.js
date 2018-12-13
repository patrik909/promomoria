import React from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';

function UpdateReleaseInfo(props) {

    return (
        <div className="AddReleaseInfo">
            <p className="helper">Fields with * is required</p>
            <Inputfield 
                className={'full-width'}
                defaultValue={props.setArtist}
                onChange={props.handleArtist}
            />
            <Inputfield 
                className={'full-width'}
                defaultValue={props.setTitle} 
                onChange={props.handleTitle}
            />
            <div className={'flex'}>
                <Inputfield 
                    className={'half-width'}
                    defaultValue={props.setCatNr} 
                    onChange={props.handleCatNr}
                />
                <Inputfield 
                    className={'half-width'}
                    defaultValue={props.setPassword} 
                    onChange={props.handlePassword}
                />
            </div>
            <div className={'flex'}>
                <Inputfield 
                    className={'half-width'}
                    defaultValue={props.setReleaseDate} 
                    onChange={props.handleReleaseDate}
                />
                <div className="EnableRating half-width flex">
                    <p>Enable rating:</p>
                    <label htmlFor="enable-rating" style={{background : props.setRating === '1' ? ( 'rgb(213, 32, 32)' ) : ( null )}}></label>
                    <input type="checkbox" className="hide" id="enable-rating" value={1} onClick={props.handleRating} />
                </div>
            </div>
            
            <textarea
                className="full-width"
                rows="12"
                maxLength="500"
                onChange={props.handleInfoText}
                defaultValue={props.setInfoText}
            ></textarea>
            <p className="UsedCharacters">Used characters: {props.infoTextLength} / 500</p>
        </div>
    );
    
}

export default UpdateReleaseInfo;