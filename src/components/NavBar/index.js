import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css';
import { useFirebase } from 'react-redux-firebase';
import Balans from '../Balans';

const { Header } = Layout;

function NavBar() {
  const firebase = useFirebase();

  const onClick = () => {
    firebase.auth().signOut().then(() => {
      console.log('SIGNOUT_SUCCESS');
    });
  };

  return (
    <Header className="nav">
      <div className="nav__row">
        <Link to="/" className="logo">MyMoney</Link>
        <Balans />
        <div className="nav__block">
          <Button type="link" icon={<LogoutOutlined />} className="nav__exit" onClick={onClick}>Выход</Button>
        </div>
      </div>
    </Header>
  );
}

export default NavBar;
