import React, {useState, useEffect, useRef} from 'react';
import Button from '../../components/Button';
import Confirmation from '../../components/ConfirmationDialog';
import AddVacationForm from '../../components/AddVacationForm'; 
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import './styles.css';
import axios from 'axios';

const HomePage = () => {
    const tableRef = useRef(null);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [showDeleteDialog, setDeleteDialog] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [vacations, setVacations] = useState([]);
    const token = localStorage.getItem("token");
    const v_id= localStorage.getItem("v_id");
    const [isUpdate, setIsUpdate] = useState(false);
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState('');
    const navigate = useNavigate();

    const handleGetEmployeeVacations = async() => {
      const user_id= localStorage.getItem("employee_id");
      const id = user_id.replace(/"/g, "");

      const config = {
        method: "GET",
        url: `http://localhost:5162/api/vacation/employee/${id}`,
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'bearer ' + token

        },
      };
      try {
        const res = await axios(config);
        if (res.data.status == "success") {
          setVacations(res.data.vacations);
          console.log(res.data.vacations);
        }
      } catch (error) {
        return error.response;
      }
  
    }

    useEffect(() => {
      handleGetEmployeeVacations();
    }, []);
    
    
    function handleLogoutClick(){
        setShowLogoutDialog(true);
    }
    function handDeleteClick(){
      setDeleteDialog(true);
  }

    function handleCancel() {
        setShowLogoutDialog(false);
        setShowForm(false);
        setDeleteDialog(false);
        setIsUpdate(false);
        setDescription( '');
        setStartDate(null);
        setEndDate(null);
        setDuration('');
    }

    const handleLogout = () => {
      
      localStorage.clear();
      navigate("/");
  }

  function handleAddVacationClick() {
    setShowForm(true);
  }
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
        setShowForm(false);
      }
    } catch (error) {
      return error.response;
    }

  }
  function handleUpdateVacation(vacation) {
    setDescription(vacation.description);
    setStartDate(new Date(vacation.startDate));
    setEndDate(new Date(vacation.endDate));
    setDuration(vacation.duration);
    setIsUpdate(true);
    setShowForm(true);
  }

  const handleDeleteVacation = async() => {

    const config = {
      method: "Delete",
      url: `http://localhost:5162/api/vacation/${v_id}`,
      headers: {
        'content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    try {
      const res = await axios(config);
      if (res.data.status == "success") {
        setDeleteDialog(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    let dataTable = null;
  
    if (tableRef.current && vacations.length > 0) {
      if (!$.fn.DataTable.isDataTable(tableRef.current)) {
        dataTable = $(tableRef.current).DataTable({
          paging: true,
          searching: false,
          lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "All"]],
        });
      }
    }
  
    return () => {
      if (dataTable !== null) {
        dataTable.destroy();
      }
    };
  }, [vacations]);
    
  return (
    <>
        <div className='main'>
        <div className='table'>
        <h2>My Vacations</h2>
        <table ref={tableRef} className="table table-striped table-bordered">
        <thead>
            <tr>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
            vacations && Array.isArray(vacations.$values) && vacations.$values.length > 0 ? (
            vacations.$values.map(vacation => (
            <tr key={vacation.id}>
                <td>{vacation.description}</td>
                <td>{vacation.startDate}</td>
                <td>{vacation.endDate}</td>
                <td>{vacation.duration}</td>
                <td>
                  {new Date(vacation.endDate) >= new Date() && (
                    <>
                    <a className='link' onClick={() => handleUpdateVacation(vacation)}>Update</a>
                    <a className='link' onClick={() => { localStorage.setItem('v_id', JSON.stringify(vacation.id));
                                                          handDeleteClick() }}>Delete</a>
                    </>)}
                </td>
            </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5}>{Array.isArray(vacations) ? 'No vacations found' : 'Loading...'}</td>
              </tr>)}
        </tbody>
        </table>
        <div className='add-vacation-button'>
          <Button type="submit" label="Add a Vacation" onClick={handleAddVacationClick} />
        </div>
      </div>
      <div className='logout'>
        <Button type="submit" label="Logout" onClick={handleLogoutClick} />
      </div>
      {showForm && (
                <div className="add-form-backdrop">
                <AddVacationForm      isUpdate={isUpdate} onCancel={handleCancel} onConfirm={handleAddVacation}
                                        initialDescription={description}
                                        initialStartDate={startDate}
                                        initialEndDate={endDate}
                                        initialDuration={duration}/></div>)}            
      {showDeleteDialog && (
          <div className="add-form-backdrop">
                      <Confirmation
                      message="Are you sure you want to delete the vacation?"
                      onCancel={handleCancel}
                      onConfirm={handleDeleteVacation}
                      /></div>)}
      {showLogoutDialog && (
                <div className="add-form-backdrop">
                            <Confirmation
                            message="Are you sure you want to logout?"
                            onCancel={handleCancel}
                            onConfirm={handleLogout}
                            /></div>)}
  </div>
    </>
  );
};

export default HomePage;