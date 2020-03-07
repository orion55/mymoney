import React from 'react';
import { Input } from 'antd';
import './style.css';

const { Search } = Input;

function Searchbar() {
  return (
    <div className="searchbar">
      <span className="searchbar__text">Поиск операций:</span>
      <Search placeholder="по сумме, категории, получателю" onSearch={(value) => console.log(value)} enterButton className="searchbar__input" />
    </div>
  );
}

export default Searchbar;
