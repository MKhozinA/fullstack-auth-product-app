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
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import api from '../../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${selectedProductId}`);
      toast({
        title: 'Sukses',
        description: 'Produk berhasil dihapus',
        status: 'success',
        duration: 3000
      });
      fetchProducts(); // Refresh list setelah hapus
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus produk',
        status: 'error',
        duration: 3000
      });
    }
  };

  const openDeleteDialog = (productId) => {
    setSelectedProductId(productId);
    onOpen();
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
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => openDeleteDialog(product._id)}
                  >
                    Hapus
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      {/* Dialog Konfirmasi Hapus */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Hapus Produk</AlertDialogHeader>
            <AlertDialogBody>
              Apakah Anda yakin ingin menghapus produk ini?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Batal</Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default ProductList; 