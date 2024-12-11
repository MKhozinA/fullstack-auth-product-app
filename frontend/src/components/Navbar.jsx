import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg="blue.500" px={4} py={3} mb={8}>
      <Flex alignItems="center">
        <Link to="/">
          <Heading size="md" color="white">Product App</Heading>
        </Link>
        <Spacer />
        {user ? (
          <Flex gap={4}>
            <Link to="/products">
              <Button colorScheme="whiteAlpha">Products</Button>
            </Link>
            <Button colorScheme="whiteAlpha" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex gap={4}>
            <Link to="/login">
              <Button colorScheme="whiteAlpha">Login</Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="whiteAlpha">Register</Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar; 