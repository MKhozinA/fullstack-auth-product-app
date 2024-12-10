import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { getProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
    } catch (error) {
      alert('Gagal memuat profil');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profil Saya
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Nama:</strong> {profile.nama}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Jenis Kelamin:</strong> {profile.jenisKelamin}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 