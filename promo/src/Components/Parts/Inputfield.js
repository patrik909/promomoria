import React from 'react';

function InputField(props) {
  return (
    <input
      type={props.type || 'text'}
      className={props.className}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

export default InputField;