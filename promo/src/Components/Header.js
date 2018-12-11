import React from 'react';
import Button from './Parts/Button.js';

function Header(props) {

    return (
        <header>
            <div>
                <h1>Promomoria</h1>
                <h2>{ props.loggedInUser ? ( props.labelName.replace(/ .*/,'') ) : ( 'Welcome' )}</h2>
            </div>
            <div className="underline"></div>
            {
                props.loggedInUser ? (
                    <Button 
                        innerText={'Log out'}
                        onClick={props.logOutUser}
                    />
                ) : ( null )
            }
        </header>
    );
}

export default Header;