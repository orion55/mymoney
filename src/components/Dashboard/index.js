import React from 'react';
import Searchbar from '../Searchbar';
import Listpayments from '../Listpayments';
import './syle.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Searchbar />
      <Listpayments />
    </div>
  );
}

export default Dashboard;
