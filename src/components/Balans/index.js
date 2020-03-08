import React from 'react';
import './style.css';
import { moneyFormat } from '../../libs/util';

function Balans() {
  return (
    <div className="balans">
      <span className="balans__info">Баланс</span>
      <span className="balans__sum">{moneyFormat(1000)}</span>
      <span className="balans__rub">руб.</span>
    </div>
  );
}

export default Balans;
