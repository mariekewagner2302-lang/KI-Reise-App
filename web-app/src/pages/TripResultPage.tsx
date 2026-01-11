import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import type { TripPlan } from '../services/api';

const TripResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripPlan = location.state?.tripPlan as TripPlan;

  if (!tripPlan) {
    return (
      <Container>
        <Typography>Kein Reiseplan gefunden.</Typography>
        <Button onClick={() => navigate('/trip-planner')}>Zurück</Button>
      </Container>
    );
  }

  const getActivityColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'restaurant': '#D4A5A5',
      'sightseeing': '#A8B5A0',
      'activity': '#B8A390',
      'museum': '#C4B5A5',
      'default': '#E8DCC4'
    };
    return colors[type.toLowerCase()] || colors.default;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #FAF8F5 0%, #E8DCC4 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Paper elevation={10} sx={{ 
          p: 4, 
          mb: 3, 
          backgroundColor: '#FAF8F5',
          borderRadius: 3,
          border: '3px solid #D4A5A5'
        }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#5A4A3A', fontWeight: 'bold' }}>
            ✨ Ihr KI-generierter Reiseplan für {tripPlan.destination}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Chip 
              label={`${tripPlan.days.length} Tage`} 
              sx={{ 
                backgroundColor: '#D4A5A5',
                color: '#5A4A3A',
                fontWeight: 'bold'
              }}
            />
            <Chip 
              label={`Gesamtkosten: ${tripPlan.total_cost}€`} 
              sx={{ 
                backgroundColor: '#A8B5A0',
                color: '#5A4A3A',
                fontWeight: 'bold'
              }}
            />
            <Chip 
              label="🤖 Von KI erstellt" 
              sx={{ 
                backgroundColor: '#B8A390',
                color: '#5A4A3A'
              }}
            />
          </Box>
        </Paper>

        {tripPlan.days.map((day) => (
          <Paper 
            key={day.day} 
            elevation={6} 
            sx={{ 
              mb: 3, 
              p: 3,
              backgroundColor: '#FAF8F5',
              borderRadius: 3,
              border: '2px solid #E8DCC4'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#5A4A3A', fontWeight: 'bold' }}>
              Tag {day.day}: {day.title}
            </Typography>
            <Divider sx={{ my: 2, borderColor: '#E8DCC4' }} />

            {day.activities.map((activity, idx) => (
              <Card 
                key={idx} 
                sx={{ 
                  mb: 2,
                  backgroundColor: '#FFF',
                  border: '2px solid #E8DCC4',
                  borderLeft: `6px solid ${getActivityColor(activity.type)}`,
                  transition: 'transform 0.2s',
                  '&:hover': { 
                    transform: 'translateX(4px)',
                    borderLeftColor: '#D4A5A5'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: '#5A4A3A', fontWeight: 'bold' }}>
                        {activity.time}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: getActivityColor(activity.type), fontWeight: 'bold', mt: 0.5 }}>
                        {activity.type === 'restaurant' ? '🍽️' : '🏛️'} {activity.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={activity.cost === 0 ? 'Kostenlos' : `${activity.cost}€`}
                      sx={{ 
                        backgroundColor: activity.cost === 0 ? '#A8B5A0' : '#D4A5A5',
                        color: '#5A4A3A',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#8B7B6A', mt: 1 }}>
                    {activity.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Box sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: '#E8DCC4', 
              borderRadius: 2,
              textAlign: 'right'
            }}>
              <Typography variant="h6" sx={{ color: '#5A4A3A', fontWeight: 'bold' }}>
                Tageskosten: {day.activities.reduce((sum, a) => sum + a.cost, 0)}€
              </Typography>
            </Box>
          </Paper>
        ))}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/trip-planner')}
            sx={{ 
              backgroundColor: '#D4A5A5',
              color: '#5A4A3A',
              fontWeight: 'bold',
              px: 4,
              '&:hover': { backgroundColor: '#C49595' }
            }}
          >
            🆕 Neue Reise planen
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{ 
              borderColor: '#B8A390',
              color: '#5A4A3A',
              fontWeight: 'bold',
              px: 4,
              '&:hover': { 
                borderColor: '#A89380',
                backgroundColor: 'rgba(184, 163, 144, 0.1)'
              }
            }}
          >
            🏠 Zum Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TripResultPage;
