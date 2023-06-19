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
    const navigate = useNavigate();
    
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
  
    const vacations = [
      {
        id: 1,
        description: 'Vacation 1',
        startDate: '2023-06-20',
        endDate: '2023-06-25',
        duration: 6,
      },
      {
        id: 2,
        description: 'Vacation 2',
        startDate: '2023-07-10',
        endDate: '2023-07-15',
        duration: 6,
      },
    ];
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
                            onConfirm={handleLogout}/></div>)}
      
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