import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { createProduct, getProduct, updateProduct } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: ''
  });

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProduct(id);
      setFormData(response.data);
    } catch (error) {
      alert('Gagal memuat data produk');
      navigate('/products');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      alert(error.response?.data?.error || 'Terjadi kesalahan');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Produk' : 'Tambah Produk'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="nama"
            label="Nama Produk"
            value={formData.nama}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="deskripsi"
            label="Deskripsi"
            multiline
            rows={4}
            value={formData.deskripsi}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="harga"
            label="Harga"
            type="number"
            value={formData.harga}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {id ? 'Update' : 'Simpan'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductForm; 