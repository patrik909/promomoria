import React from 'react';

function Header(props) {
    return (
        <header>
            <div>
                <h1>Promomoria</h1>
                <h2>{props.labelName.replace(/ .*/,'')}</h2>
            </div>
            <div className="underline"></div>
        </header>
    );
}

export default Header;