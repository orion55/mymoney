import React, { useState } from 'react';
import {
  Form, Input, Button, Alert, Spin,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded } from 'react-redux-firebase';
import './style.css';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function SignIn() {
  const [authError, setAuthError] = useState('');
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useFirebase();
  const history = useHistory();

  const onFinish = async (values) => {
    if (auth.uid) {
      await firebase.auth().signOut();
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
      await firebase.auth();
      setAuthError('');
      history.push('/');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (!isLoaded(auth)) {
    return (
      <div className="spin spin__full">
        <Spin />
      </div>
    );
  }

  const onClose = () => {
    setAuthError('');
  };


  return (
    <div className="signin">
      <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} className="signin__form">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Введённая информация не является допустимым E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите Ваш E-mail!!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите Ваш пароль!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Вход
          </Button>
          <Button type="link" htmlType="button">
            <Link to="/signup">Регистрация</Link>
          </Button>
        </Form.Item>
        { authError ? <div className="alert"><Alert message="Ошибка" description={authError} type="error" showIcon closable onClose={onClose} /></div> : null }
      </Form>
    </div>
  );
}

export default SignIn;
