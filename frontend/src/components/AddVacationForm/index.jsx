import React, { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import Button from '../Button';
import './styles.css';

const AddVacationForm = () => {
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
      calculateDuration();
    }, [startDate, endDate]);
  
    const calculateDuration = () => {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays + ' days');
      } else {
        setDuration('');
      }
    };

 return (
    <div>
        <form className="vacation-form">
          <h2>Add Vacation</h2>
          <TextInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            label="startDate"
            value={startDate}
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextInput
            label="endDate"
            value={endDate}
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className='duration'>
            <label>Duration:</label>
            <input type="text" value={duration} className='duration-box' readOnly />
          </div>
          <Button type="submit" label="Add" />
        </form>
    </div>
  );
};

export default AddVacationForm;