import React, {useState, useEffect, useRef} from 'react';
import Button from '../../components/Button';
import Confirmation from '../../components/ConfirmationDialog';
import AddVacationForm from '../../components/AddVacationForm'; 
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import './styles.css';

const HomePage = () => {
    const tableRef = useRef(null);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [vacations, setVacations] = useState('');
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
          
        }
      } catch (error) {
        return error.response;
      }
  
    }
    
    function handleLogoutClick(){
        setShowLogoutDialog(true);
    }

    function handleCancel() {
        setShowLogoutDialog(false);
        setShowForm(false);
    }

    const handleLogout = () => {
      
      localStorage.clear();
      navigate("/");
  }

  function handleAddVacation(){
    setShowForm(true);
}

    useEffect(() => {
      $(tableRef.current).DataTable();
    }, []);
    
  return (
    <div className='main'>
        <div className='table'>
        <h2>My Vacations</h2>
        <table ref={tableRef} className="table">
        <thead>
            <tr>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            </tr>
        </thead>
        <tbody>
            {vacations.map((vacation) => (
            <tr key={vacation.id}>
                <td>{vacation.description}</td>
                <td>{vacation.startDate}</td>
                <td>{vacation.endDate}</td>
                <td>{vacation.duration} days</td>
            </tr>
            ))}
        </tbody>
        </table>
        <div className='add-vacation-button'>
          <Button type="submit" label="Add a Vacation" onClick={handleAddVacation} />
        </div>
      </div>
      <div className='logout'>
        <Button type="submit" label="Logout" onClick={handleLogoutClick} />
      </div>
      {showForm && (
                <div className="add-form-backdrop">
                <AddVacationForm onCancel={handleCancel}
                            onConfirm={handleGetEmployeeVacations}/></div>)}
      
      {showLogoutDialog && (
                <div className="add-form-backdrop">
                            <Confirmation
                            message="Are you sure you want to logout?"
                            onCancel={handleCancel}
                            onConfirm={handleLogout}
                            /></div>)}
  </div>

  );
};

export default HomePage;