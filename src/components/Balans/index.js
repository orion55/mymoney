import React from 'react';
import Amount from 'arui-feather/amount';
import './style.css';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Spin } from 'antd';

function Balans() {
  useFirestoreConnect('users');
  const users = useSelector((state) => state.firestore.data.users);
  const auth = useSelector((state) => state.firebase.auth);
  const selectUid = () => auth.uid;

  if (!isLoaded(users)) {
    return (
      <div className="spin">
        <Spin />
      </div>
    );
  }

  const user = _.filter(users, (obj) => obj.uid === selectUid());

  let total = 0;
  if (user.length !== 0) {
    total = user[0].total;
  }

  const AMOUNT = {
    value: total,
    currency: {
      code: 'RUR',
      minority: 100,
    },
  };
  return (
    <div className="balans">
      <span className="balans__info">Баланс</span>
      <span className="balans__sum">
        <Amount size="xl" amount={AMOUNT} className="balans__val" showZeroMinorPart />
      </span>
    </div>
  );
}

export default Balans;
