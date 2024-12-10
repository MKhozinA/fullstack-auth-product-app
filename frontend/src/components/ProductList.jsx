import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { getProducts, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      alert('Gagal memuat produk');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      alert('Gagal menghapus produk');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Daftar Produk
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/products/create')}
        sx={{ mb: 3 }}
      >
        Tambah Produk
      </Button>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.nama}</Typography>
                <Typography color="textSecondary">
                  Harga: Rp {product.harga}
                </Typography>
                <Typography variant="body2">{product.deskripsi}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/products/edit/${product._id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(product._id)}
                >
                  Hapus
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList; 