import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const TextInput = ({ label, value, type, onChange }) => {
  
  const handleDateChange = (date) => {
    onChange(date);
  };
    return (
      <div className='text-input'>
        <label >{label}:</label>
        {type === 'date' ? (
        <DatePicker selected={value} onChange={handleDateChange}/>
      ) : (
        <input type="text" value={value} onChange={onChange} className='input' />
      )}  
      </div>
    );
  };

export default TextInput;