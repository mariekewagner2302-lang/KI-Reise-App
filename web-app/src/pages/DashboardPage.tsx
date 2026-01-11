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
    { label: 'Reisen geplant', value: '0', icon: '✈️', color: '#D4A5A5' },
    { label: 'Länder erkundet', value: '0', icon: '🌍', color: '#A8B5A0' },
    { label: 'Budget gespart', value: '0€', icon: '💰', color: '#B8A390' },
    { label: 'KI-Empfehlungen', value: '0', icon: '🤖', color: '#C4B5A5' }
  ];

  const quickActions = [
    { title: '✈️ Neue Reise planen', desc: 'Erstellen Sie Ihren nächsten Trip', action: '/trip-planner', color: '#D4A5A5' },
    { title: '📋 Meine Reisen', desc: 'Ihre gespeicherten Reisepläne', action: '#', color: '#A8B5A0', disabled: true },
    { title: '⭐ Favoriten', desc: 'Ihre Lieblingsziele', action: '#', color: '#B8A390', disabled: true }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          mb: 3, 
          background: 'linear-gradient(135deg, #E8DCC4 0%, #D4A5A5 100%)',
          borderRadius: 3
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: '#FAF8F5', 
                color: '#D4A5A5', 
                fontSize: '2rem',
                border: '3px solid #B8A390'
              }}>
                {userEmail.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom sx={{ mb: 0.5, color: '#5A4A3A', fontWeight: 'bold' }}>
                  Willkommen zurück! 👋
                </Typography>
                <Typography variant="body1" sx={{ color: '#5A4A3A', opacity: 0.8 }}>
                  {userEmail}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{ 
                color: '#5A4A3A', 
                borderColor: '#B8A390',
                '&:hover': { 
                  borderColor: '#A89380', 
                  bgcolor: 'rgba(184, 163, 144, 0.2)' 
                }
              }}
            >
              Abmelden
            </Button>
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
          {stats.map((stat, idx) => (
            <Card 
              key={idx}
              sx={{ 
                flex: '1 1 200px', 
                minWidth: 200,
                transition: 'transform 0.2s',
                backgroundColor: '#FAF8F5',
                border: '2px solid #E8DCC4',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  borderColor: stat.color
                } 
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color={stat.color}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Typography variant="h3">{stat.icon}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#FAF8F5' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#5A4A3A' }}>
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
                  backgroundColor: '#FAF8F5',
                  border: `2px solid ${action.color}`,
                  borderLeft: `6px solid ${action.color}`,
                  '&:hover': action.disabled ? {} : { 
                    transform: 'translateY(-4px)', 
                    boxShadow: 4 
                  }
                }}
                onClick={() => !action.disabled && navigate(action.action)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#5A4A3A' }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                    {action.desc}
                  </Typography>
                  {action.disabled && (
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#8B7B6A' }}>
                      Bald verfügbar
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, backgroundColor: '#FAF8F5' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#5A4A3A' }}>
            💡 Wie funktioniert TravelPlanner?
          </Typography>
          <Divider sx={{ mb: 2, borderColor: '#E8DCC4' }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#D4A5A5' }}>
                1️⃣ Reise planen
              </Typography>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                Geben Sie Ihr Reiseziel, Budget, Dauer und Interessen ein.
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#A8B5A0' }}>
                2️⃣ KI arbeitet
              </Typography>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                Unsere KI erstellt einen personalisierten Tagesplan mit echten Orten.
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#B8A390' }}>
                3️⃣ Entdecken
              </Typography>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
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
