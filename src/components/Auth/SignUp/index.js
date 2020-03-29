import React, { useState } from 'react';
import {
  Form, Input, Button, Spin, Alert,
} from 'antd';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, useFirebase, useFirestore } from 'react-redux-firebase';

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

function SignUp() {
  const [authError, setAuthError] = useState('');
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const history = useHistory();

  const onFinish = async (values) => {
    if (auth.uid) {
      await firebase.auth().signOut();
    }
    try {
      // console.log(values);
      const resp = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
      await firestore.add('users', { total: 0, uid: resp.user.uid });
      setAuthError('');
      history.push('/');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onClose = () => {
    setAuthError('');
  };

  if (!isLoaded(auth)) {
    return (
      <div className="spin spin__full">
        <Spin />
      </div>
    );
  }
  return (
    <div className="signup">
      <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} className="signup__form">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Не допустимый E-mail!',
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
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Подтвердите Пароль"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, подтвердите Ваш пароль!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Два пароля, которые вы ввели, не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
          <Button type="link" htmlType="button">
            <Link to="/signin">Вход</Link>
          </Button>
        </Form.Item>
        { authError ? <div className="alert"><Alert message="Ошибка" description={authError} type="error" showIcon closable onClose={onClose} /></div> : null }
      </Form>
    </div>
  );
}

export default SignUp;
