import React from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';

function ReleaseLogin(props) {
    return (
        <div className="ReleaseLogin">
            {props.releaseData.artist} - {props.releaseData.title}
            <Inputfield 
                placeholder={'password'}
                onChange={props.handlePassword}
            />
            <Button 
                innerText={'OK'}
                onClick={props.handleAccess}
            />
        </div>
    );
}

export default ReleaseLogin;