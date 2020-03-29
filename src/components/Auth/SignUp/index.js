import React from 'react';
import { Form, Input, Button } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';

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
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
              message: 'Please confirm your password!',
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
      </Form>
    </div>
  );
}

export default SignUp;
