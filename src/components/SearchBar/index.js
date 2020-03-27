import React from 'react';
import { Input } from 'antd';
import './style.css';
import { useDispatch } from 'react-redux';
import { changeText } from '../../store/slice/searchSlice';

const { Search } = Input;

function SearchBar() {
  const dispatch = useDispatch();
  const onChange = (e) => dispatch(changeText(e.target.value.trim()));

  return (
    <div className="searchbar">
      <span className="searchbar__text">Поиск операций:</span>
      <Search placeholder="по сумме, категории, получателю" onChange={onChange} className="searchbar__input" />
    </div>
  );
}

export default SearchBar;
