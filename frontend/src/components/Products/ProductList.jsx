import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import api from '../../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal mengambil data produk',
        status: 'error',
        duration: 3000
      });
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Daftar Produk</Heading>
          <Button colorScheme="blue" onClick={() => navigate('/products/new')}>
            Tambah Produk
          </Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Harga</Th>
              <Th>Deskripsi</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.description}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => navigate(`/products/${product._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                  >
                    Hapus
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
}

export default ProductList; 