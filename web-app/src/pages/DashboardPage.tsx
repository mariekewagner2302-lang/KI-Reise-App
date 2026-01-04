import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Card, CardContent } from '@mui/material';
import { clearAuthToken, getAuthToken } from '../services/api';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  if (!user) return <Typography>Laden...</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4">Dashboard</Typography>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Abmelden
            </Button>
          </Box>
          <Card>
            <CardContent>
              <Typography variant="h6">Willkommen zurück! 👋</Typography>
              <Typography>E-Mail: <strong>{user.email}</strong></Typography>
              <Typography>User-ID: <strong>{user.userId}</strong></Typography>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;
