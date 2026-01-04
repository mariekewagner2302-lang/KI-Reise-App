import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import { signup, saveAuthToken } from '../services/api';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await signup(formData);
      saveAuthToken(response.accessToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registrierung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Registrierung
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Vorname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nachname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="E-Mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Passwort"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              helperText="Mindestens 8 Zeichen"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Wird erstellt...' : 'Registrieren'}
            </Button>
            <Typography variant="body2" align="center">
              Bereits registriert? <Link to="/login">Jetzt anmelden</Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignupPage;
