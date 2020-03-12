import React from 'react';
import Amount from 'arui-feather/amount';
import './style.css';

function Balans() {
  const AMOUNT = {
    value: 12353500,
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
