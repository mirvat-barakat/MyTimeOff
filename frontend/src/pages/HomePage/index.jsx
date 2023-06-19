import React, {useEffect, useRef} from 'react';
import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import './styles.css';

const HomePage = () => {
    const tableRef = useRef(null);

    useEffect(() => {
      $(tableRef.current).DataTable();
    }, []);

  return (
    <div>
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
  );
};

export default HomePage;