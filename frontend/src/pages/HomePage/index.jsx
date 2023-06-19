import React, {useEffect, useRef} from 'react';
import Button from '../../components/Button';
import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import './styles.css';

const HomePage = () => {
    const tableRef = useRef(null);

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
      </div>
      <div className='logout'>
        <Button type="submit" label="Logout" />
      </div>
  </div>

  );
};

export default HomePage;