import React, { Component } from 'react';
import Inputfield from '../Components/Parts/Inputfield.js';
import Button from '../Components/Parts/Button.js';

class AddRelease extends Component {

    render() {
        return (
            <div className="AddRelease">
                <Inputfield placeholder={'Artist'} />
                <Inputfield placeholder={'Title'} />
                <Inputfield placeholder={'Cat nr'} />
                <Inputfield placeholder={'Release'} />
                <Inputfield placeholder={'Password'} />
                <Inputfield placeholder={'Info text'} />
                <Button 
                    innerText={'Submit'}
                    onClick={this.registerUser}
                />
            </div>
        );
    }
}

export default AddRelease;