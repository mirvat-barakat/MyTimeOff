import React from 'react';
import './styles.css';

const TextInput = ({ label, value, type, onChange }) => {
    return (
      <div className='text-input'>
        <label >{label}:</label>
        {type === 'date' ? (
        <input type="date" value={value} onChange={onChange} />
      ) : (
        <input type="text" value={value} onChange={onChange} />
      )}
        
      </div>
    );
  };

export default TextInput;