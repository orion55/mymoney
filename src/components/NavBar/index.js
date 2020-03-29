import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Balans from '../Balans';


const { Header } = Layout;

function NavBar() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();

  const onClick = () => {
    if (auth.uid) {
      firebase.auth().signOut().then(() => {
        history.push('/signin');
      });
    }
  };

  return (
    <Header className="nav">
      <div className="nav__row">
        <Link to="/" className="logo">MyMoney</Link>
        { auth.uid
          ? (
            <>
              <Balans />
              <div className="nav__block">
                <Button type="link" icon={<LogoutOutlined />} className="nav__exit" onClick={onClick}>Выход</Button>
              </div>
            </>
          )
          : null }
      </div>
    </Header>
  );
}

export default NavBar;
