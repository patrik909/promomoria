import React from 'react';

function Inputfield(props) {
    return (
        <input
            type={props.type || 'text'}
            className={props.className}
            placeholder={props.placeholder}
            onChange={props.onChange}
            defaultValue={props.defaultValue || ''}
        />
    );
}

export default Inputfield;