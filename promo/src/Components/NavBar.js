import React, { Component } from 'react';
import Button from './Parts/Button.js';

class NavBar extends Component {

    render() {
        return (
            <nav>
                <div>
                    <h1>Promomoria</h1> 
                    <Button innerText={'Add'}/>
                    <Button innerText={'View'}/>  
                </div>
                <div>
                    {/* underline för nav-baren*/}
                </div>
            </nav>
        );
    }
}

export default NavBar;