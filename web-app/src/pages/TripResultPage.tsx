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
  Divider,
  Chip,
  Stack
} from '@mui/material';

interface Activity {
  time: string;
  name: string;
  type: string;
  cost: number;
  description: string;
}

interface Day {
  day: number;
  title: string;
  activities: Activity[];
}

interface TripPlan {
  destination: string;
  total_cost: number;
  days: Day[];
}

const TripResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state as TripPlan;

  // Fallback: Falls keine Daten vorhanden
  if (!tripData || !tripData.days) {
    navigate('/trip-planner');
    return null;
  }

  const getActivityIcon = (type: string): string => {
    const icons: Record<string, string> = {
      hotel: '🏨',
      food: '🍽️',
      culture: '🏛️',
      shopping: '🛍️',
      nature: '🌳',
      entertainment: '🎭',
      transport: '🚇'
    };
    return icons[type] || '📍';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            ✨ Ihr KI-generierter Reiseplan für {tripData.destination}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
            <Chip 
              label={`${tripData.days.length} ${tripData.days.length === 1 ? 'Tag' : 'Tage'}`} 
              color="primary" 
            />
            <Chip 
              label={`Gesamtkosten: ${tripData.total_cost}€`} 
              color="secondary" 
            />
            <Chip 
              label="🤖 Von KI erstellt" 
              variant="outlined" 
            />
          </Stack>
        </Paper>

        {/* Itinerary - Tag für Tag */}
        {tripData.days.map((day) => (
          <Paper key={day.day} elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Tag {day.day}: {day.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {day.activities.map((activity, idx) => (
              <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Typography 
                      variant="h6" 
                      color="text.secondary" 
                      sx={{ minWidth: 70, flexShrink: 0 }}
                    >
                      {activity.time}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {getActivityIcon(activity.type)} {activity.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="primary" 
                      sx={{ fontWeight: 'bold', flexShrink: 0 }}
                    >
                      {activity.cost > 0 ? `${activity.cost}€` : 'Kostenlos'}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}

            <Typography 
              variant="body2" 
              align="right" 
              sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main' }}
            >
              Tageskosten: {day.activities.reduce((sum, a) => sum + a.cost, 0)}€
            </Typography>
          </Paper>
        ))}

        {/* Actions */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate('/trip-planner')}
            fullWidth
            size="large"
          >
            🔄 Neue Reise planen
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            fullWidth
            size="large"
          >
            ← Zurück zum Dashboard
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default TripResultPage;
