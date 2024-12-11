import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

function EditProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal mengambil data produk',
        status: 'error',
        duration: 3000
      });
      navigate('/products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, {
        name,
        price: Number(price),
        description
      });
      toast({
        title: 'Sukses',
        description: 'Produk berhasil diupdate',
        status: 'success',
        duration: 3000
      });
      navigate('/products');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Gagal mengupdate produk',
        status: 'error',
        duration: 3000
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Heading>Edit Produk</Heading>
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
              Update
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

export default EditProduct; 