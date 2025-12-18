import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

import { LoginRequest, LoginResponse, userLogin } from '../apis';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<LoginResponse | null>(null);

  const handleLogin = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await userLogin(values);
      setUserData(response);
      message.success('Login successful!');
    } catch (error: any) {
      message.error(error?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onFinish={handleLogin} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            autoComplete="username"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" block loading={loading}>
            {'Login'}
          </Button>
        </Form.Item>
      </Form>

      {userData && (
        <div style={{ marginTop: 24, padding: 16, background: '#f0f0f0' }}>
          <h3>Login Response:</h3>
          <pre style={{ overflow: 'auto' }}>
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
