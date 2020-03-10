import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css';
import Balans from '../Balans';

const { Header } = Layout;

function NavBar() {
  return (
    <Header className="nav">
      <div className="nav__row">
        <Link to="/" className="logo">MyMoney</Link>
        <Balans />
        <div className="nav__block">
          <Button type="primary" shape="circle" className="nav__but">GO</Button>
          <Button type="link" icon={<LogoutOutlined />} className="nav__exit">Выход</Button>
        </div>
      </div>
    </Header>
  );
}

export default NavBar;
