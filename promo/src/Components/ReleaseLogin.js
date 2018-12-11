import React from 'react';
import Inputfield from './Parts/Inputfield.js';
import Button from './Parts/Button.js';

function ReleaseLogin(props) {
    console.log(props.releaseData)
    return (
        <main className="ReleaseLogin">
            <div className="ReleaseLoginForm">
                <div className="ReleaseLoginTopContent">
                    <h3>{props.releaseData.artist}</h3>
                    <h4>{props.releaseData.title}</h4>
                </div>
                <div className="ReleaseLoginInputs">
                    <Inputfield 
                        placeholder={'Password'}
                        onChange={props.handlePassword}
                    />    
                    <Button 
                        innerText={'OK'}
                        onClick={props.handleAccess}
                    /> 
                </div>
                <div className="ReleaseLoginBottomContent">
                    <h4>{props.releaseData.cat_number} released on</h4>
                    <h3>Record Label</h3>
                </div>
            </div>    
        </main>
    );
}

export default ReleaseLogin;