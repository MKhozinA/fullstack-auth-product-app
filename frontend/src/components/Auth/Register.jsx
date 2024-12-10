import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import api from '../../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      toast({
        title: 'Registrasi berhasil',
        status: 'success',
        duration: 3000
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registrasi gagal',
        description: error.response?.data?.message || 'Terjadi kesalahan',
        status: 'error',
        duration: 3000
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Heading>Register</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%">
              Register
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

export default Register; 