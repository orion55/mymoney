import React from 'react';
import Searchbar from '../Searchbar';
import Listpayments from '../Listpayments';
import Addpay from '../Addpay';
import './style.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__block">
        <Addpay />
        <Searchbar />
      </div>
      <Listpayments />
    </div>
  );
}

export default Dashboard;
