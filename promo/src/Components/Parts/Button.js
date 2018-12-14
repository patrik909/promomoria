import React from 'react';

function Button(props) {
    return (
        <button
          className={props.className}
          onClick={props.onClick}
          id={props.id}
          value={props.value}
        >
            {props.innerText}
        </button>
    );
}

export default Button;