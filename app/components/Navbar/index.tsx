import React from 'react';
import { Button, Flex, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  isAuthenticated,
  logout as performLogout,
} from '../../auth/auth'; // Adjust path

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  const handleLogout = () => {
    performLogout();
    message.success('Logged out successfully.');
    navigate('/login');
    // You might need to force a re-render or use a state management solution
    // to update the navbar immediately if it shows conditional content.
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ padding: '10px 20px', backgroundColor: '#001529' }}
    >
      <Link
        to={authenticated ? '/list' : '/'}
        style={{ color: 'white', fontSize: '1.5rem' }}
      >
        {user?.username ? 'Welcome, ' + user?.username : 'Авито клон'}
      </Link>
      <Flex gap="small">
        {authenticated ? (
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary">Sign Up</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
