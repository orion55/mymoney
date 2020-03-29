import React from 'react';
import SearchBar from '../SearchBar';
import ListPayments from '../ListPayments';
import AddPay from '../AddPay';
import './style.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();

  if (!auth.uid) {
    history.push('/signin');
  }

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
