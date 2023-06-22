import React, { useState, useEffect } from 'react';
import TextInput from '../TextInput';
import Button from '../Button';
import axios from 'axios';
import './styles.css';

const AddVacationForm = (props) => {
  const {
    onCancel,
    isUpdate,
    initialDescription,
    initialStartDate,
    initialEndDate,
    initialDuration,
  } = props;
  const [description, setDescription] = useState(initialDescription || '');
  const [startDate, setStartDate] = useState(initialStartDate || null);
  const [endDate, setEndDate] = useState(initialEndDate || null);
  const [duration, setDuration] = useState(initialDuration || '');
  const token = localStorage.getItem("token");
  const user_id= localStorage.getItem("employee_id");
  const id = user_id.replace(/"/g, "")
  const v_id= localStorage.getItem("v_id");

  const handleAddVacation = async() => {

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
        'Authorization': `Bearer ${token}`,

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

  const handleUpdateVacation = async() => {

    const data = {
      "description": description,
      "startDate": startDate,
      "endDate": endDate,
      "duration": duration,
    }
    console.log(data);
    console.log(id);
    const config = {
      method: "Put",
      data:data,
      url: `http://localhost:5162/api/vacation/${v_id}`,
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        <h2>{isUpdate ? 'Update Vacation' : 'Add Vacation'}</h2>
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
              <Button type="submit" label={isUpdate ? 'Update' : 'Add'} className="confirmation-dialog-button  confirm" onClick={isUpdate ? handleUpdateVacation : handleAddVacation}/>
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default AddVacationForm;