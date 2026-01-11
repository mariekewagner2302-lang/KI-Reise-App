import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link
} from '@mui/material';
import { signup } from '../services/api';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registrierung fehlgeschlagen');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #E8DCC4 0%, #D4A5A5 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, backgroundColor: '#FAF8F5', borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#5A4A3A', fontWeight: 'bold' }}>
            Registrierung
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, backgroundColor: '#f8d7da', color: '#721c24' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Vorname"
              margin="normal"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' }
              }}
            />

            <TextField
              fullWidth
              label="Nachname"
              margin="normal"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' }
              }}
            />

            <TextField
              fullWidth
              label="E-Mail"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' }
              }}
            />

            <TextField
              fullWidth
              label="Passwort"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              helperText="Mindestens 8 Zeichen"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' },
                '& .MuiFormHelperText-root': { color: '#8B7B6A' }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 3,
                backgroundColor: '#D4A5A5',
                color: '#5A4A3A',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#C49595' }
              }}
            >
              REGISTRIEREN
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                Bereits registriert?{' '}
                <Link 
                  onClick={() => navigate('/login')} 
                  sx={{ 
                    color: '#D4A5A5', 
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Jetzt anmelden
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;
