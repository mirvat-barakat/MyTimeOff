import React, { useState } from 'react';
import TextInput from '../TextInput';
import Button from '../Button';
import './styles.css';

const AddVacationForm = () => {

 return (
    <div>
        <form onSubmit={handleRegisterSubmit} className="form">
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
          <Button type="submit" label="Add" />
        </form>
    </div>
  );
};

export default AddVacationForm;