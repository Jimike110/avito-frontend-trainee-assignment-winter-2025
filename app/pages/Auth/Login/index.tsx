import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import '../auth.css';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
        <Title level={3}>Log In</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          // style={{ maxWidth: 360 }}
          onFinish={onFinish}
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
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log In
            </Button>
            or <Link to="/signup">Sign Up</Link>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default Login;
