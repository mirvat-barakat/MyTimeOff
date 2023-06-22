import React, { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import Button from '../Button';
import axios from 'axios';
import './styles.css';

const AddVacationForm = (props) => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState('');
  const {onCancel, onConfirm } = props;
  const token = localStorage.getItem("token");

  const handleAddVacation = async() => {
    const user_id= localStorage.getItem("employee_id");
      const id = user_id.replace(/"/g, "")

    const data = {
      "Description": description,
      "StartDate": startDate,
      "EndDate": endDate,
      "Duration": duration,
    }
    const config = {
      method: "Post",
      data:data,
      url: `http://localhost:5162/api/vacation/${id}`,
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,

      },
    };
    try {
      const res = await axios(config);
      if (res.data.status == "success") {
        console.log("success");
      }
    } catch (error) {
      return error.response;
    }

  }

  const calculateDuration = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays + ' days');
    } else {
      setDuration('');
    }
  };

  useEffect(() => {
    calculateDuration();
  }, [startDate, endDate]);

  return (
    <div>
      <form className="vacation-form">
        <h2>Add Vacation</h2>
          <div className='info'>
          <TextInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            type='date'
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
          <TextInput
            type='date'
            label="End Date"
            value={endDate}
            onChange={setEndDate}
          />
          <TextInput
            label="Duration"
            value={duration}
            onChange={setDuration}
            readonly
          />
          <div className="confirmation-dialog-buttons">
              <Button type="submit" label="Cancel" className="confirmation-dialog-button  cancel" onClick={onCancel}/>
              <Button type="submit" label=" Add" className="confirmation-dialog-button  confirm" onClick={handleAddVacation}/>
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default AddVacationForm;