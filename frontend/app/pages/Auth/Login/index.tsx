import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, message } from 'antd';
import '../auth.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { login, isAuthenticated } from '../../../auth/auth';
import { User } from '../../../types/users';

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/list';

  useEffect(() => {
    if (isAuthenticated()) {
      void navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const onFinish = async (values: User) => {
    try {
      await login(values.username, values.password);
      messageApi.success('Login successful!');
      void navigate(from, { replace: true });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';
      messageApi.error(errorMessage);
    }
  };

  return (
    <div className="container">
      <Flex
        gap={14}
        vertical
        className="container"
        align="center"
        justify="center"
      >
        <p>{contextHolder}</p>
        <Title level={3}>Log In</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ minWidth: 300 }}
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
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log In
            </Button>
            Or <Link to="/signup">Sign Up now!</Link>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default Login;
