import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import api from '../../services/api';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, price: Number(price), description });
      toast({
        title: 'Sukses',
        description: 'Produk berhasil ditambahkan',
        status: 'success',
        duration: 3000
      });
      navigate('/products');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Gagal menambahkan produk',
        status: 'error',
        duration: 3000
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Heading>Tambah Produk</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nama Produk</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Harga</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%">
              Simpan
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

export default ProductForm; 