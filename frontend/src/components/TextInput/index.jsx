import React from 'react';
import './styles.css';

const TextInput = ({ label, value, onChange }) => {
    return (
      <div className='text-input'>
        <label >{label}:</label>
        <input type="text" value={value} onChange={onChange} />
      </div>
    );
  };

export default TextInput;