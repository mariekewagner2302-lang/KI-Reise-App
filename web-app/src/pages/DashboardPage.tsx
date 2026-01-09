import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { logout } from '../services/api';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Nutzer';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Reisen geplant', value: '0', icon: '✈️', color: '#1976d2' },
    { label: 'Länder erkundet', value: '0', icon: '🌍', color: '#2e7d32' },
    { label: 'Budget gespart', value: '0€', icon: '💰', color: '#ed6c02' },
    { label: 'KI-Empfehlungen', value: '0', icon: '🤖', color: '#9c27b0' }
  ];

  const quickActions = [
    { title: '✈️ Neue Reise planen', desc: 'Erstellen Sie Ihren nächsten Trip', action: '/trip-planner', color: '#1976d2' },
    { title: '📋 Meine Reisen', desc: 'Ihre gespeicherten Reisepläne', action: '#', color: '#2e7d32', disabled: true },
    { title: '⭐ Favoriten', desc: 'Ihre Lieblingsziele', action: '#', color: '#ed6c02', disabled: true }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'white', color: '#667eea', fontSize: '2rem' }}>
                {userEmail.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom sx={{ mb: 0.5 }}>
                  Willkommen zurück! 👋
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {userEmail}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Abmelden
            </Button>
          </Stack>
        </Paper>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
          {stats.map((stat, idx) => (
            <Card 
              key={idx}
              sx={{ 
                flex: '1 1 200px', 
                minWidth: 200,
                transition: 'transform 0.2s', 
                '&:hover': { transform: 'translateY(-4px)' } 
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color={stat.color}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                  <Typography variant="h3">{stat.icon}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Quick Actions */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            🚀 Schnellzugriff
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {quickActions.map((action, idx) => (
              <Card 
                key={idx}
                sx={{ 
                  flex: '1 1 250px',
                  minWidth: 250,
                  cursor: action.disabled ? 'not-allowed' : 'pointer',
                  opacity: action.disabled ? 0.6 : 1,
                  transition: 'all 0.2s',
                  '&:hover': action.disabled ? {} : { transform: 'translateY(-4px)', boxShadow: 4 },
                  borderLeft: `4px solid ${action.color}`
                }}
                onClick={() => !action.disabled && navigate(action.action)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.desc}
                  </Typography>
                  {action.disabled && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Bald verfügbar
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>

        {/* Info Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            💡 Wie funktioniert TravelPlanner?
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                1️⃣ Reise planen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Geben Sie Ihr Reiseziel, Budget, Dauer und Interessen ein.
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                2️⃣ KI arbeitet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Unsere KI erstellt einen personalisierten Tagesplan mit echten Orten.
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                3️⃣ Entdecken
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sehen Sie Sehenswürdigkeiten, Restaurants und Aktivitäten mit Uhrzeiten und Kosten.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;
