import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { User } from '../../../types/users';
import { signup, isAuthenticated } from '../../../auth/auth';
import '../auth.css';

const Signup: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAuthenticated()) {
      void navigate('/list');
    }
  }, [navigate]);

  const onFinish = async (values: User) => {
    if (values.password !== values.confirmPassword) {
      messageApi.error('Passwords do not match!');
      return;
    }
    try {
      await signup(values.username, values.password);
      messageApi.success('Signup successful! Please log in.');
      void navigate('/login');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || 'Signup failed. Please try again.';
      messageApi.error(errorMessage);
    }
  };

  return (
    <Flex
      gap={14}
      className="container"
      vertical
      align="center"
      justify="center"
    >
      <p>{contextHolder}</p>
      <Title level={3}>Sign Up</Title>
      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        style={{ minWidth: 300 }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          hasFeedback
        >
          <Input.Password // Use Input.Password for visibility toggle
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your Password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm password"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sign Up
          </Button>
          Or <Link to="/login">already have an account? Log In</Link>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Signup;
