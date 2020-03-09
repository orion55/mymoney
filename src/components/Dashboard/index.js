import React from 'react';
import SearchBar from '../SearchBar';
import ListPayments from '../ListPayments';
import AddPay from '../AddPay';
import './style.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__block">
        <AddPay />
        <SearchBar />
      </div>
      <ListPayments />
    </div>
  );
}

export default Dashboard;
