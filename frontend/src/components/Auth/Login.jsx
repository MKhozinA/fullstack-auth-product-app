import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const toast = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      toast({
        title: 'Login berhasil',
        status: 'success',
        duration: 3000
      })
      navigate('/products')
    } catch (error) {
      toast({
        title: 'Login gagal',
        description: error.response?.data?.message || 'Username atau password salah',
        status: 'error',
        duration: 3000
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%">
              Login
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}

export default Login 