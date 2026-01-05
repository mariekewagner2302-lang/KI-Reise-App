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

interface LocationState {
  destination: string;
  budget: string;
  duration: string;
  interests: string[];
}

const TripResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as LocationState;

  // Falls keine Daten, zurück zum Planer
  if (!formData) {
    navigate('/trip-planner');
    return null;
  }

  // Mock-Daten für Itinerary (später vom Backend)
  const mockItinerary = [
    {
      day: 1,
      title: 'Ankunft & Erkundung',
      activities: [
        { time: '10:00', name: 'Ankunft im Hotel', type: 'hotel', cost: 0 },
        { time: '12:00', name: 'Mittagessen in lokalem Restaurant', type: 'food', cost: 25 },
        { time: '14:00', name: `Hauptsehenswürdigkeit in ${formData.destination}`, type: 'culture', cost: 15 },
        { time: '18:00', name: 'Stadtbummel & Shopping', type: 'shopping', cost: 50 },
        { time: '20:00', name: 'Abendessen mit lokaler Küche', type: 'food', cost: 40 }
      ]
    },
    {
      day: 2,
      title: 'Kultur & Geschichte',
      activities: [
        { time: '09:00', name: 'Frühstück im Café', type: 'food', cost: 15 },
        { time: '10:30', name: 'Museum-Tour', type: 'culture', cost: 20 },
        { time: '13:00', name: 'Mittagessen', type: 'food', cost: 30 },
        { time: '15:00', name: 'Historisches Viertel besichtigen', type: 'culture', cost: 0 },
        { time: '19:00', name: 'Dinner mit Aussicht', type: 'food', cost: 60 }
      ]
    },
    {
      day: 3,
      title: 'Entspannung & Genuss',
      activities: [
        { time: '10:00', name: 'Brunch in trendigem Café', type: 'food', cost: 35 },
        { time: '12:30', name: 'Park-Spaziergang', type: 'nature', cost: 0 },
        { time: '15:00', name: 'Lokaler Markt', type: 'shopping', cost: 40 },
        { time: '18:00', name: 'Sunset-Spot besuchen', type: 'nature', cost: 0 },
        { time: '20:00', name: 'Abschiedsessen', type: 'food', cost: 50 }
      ]
    }
  ];

  // Nur so viele Tage wie gewählt
  const filteredItinerary = mockItinerary.slice(0, parseInt(formData.duration));

  // Gesamtkosten berechnen
  const totalCost = filteredItinerary.reduce((sum, day) => 
    sum + day.activities.reduce((daySum, activity) => daySum + activity.cost, 0), 
    0
  );

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      hotel: '🏨',
      food: '🍽️',
      culture: '🏛️',
      shopping: '🛍️',
      nature: '🌳',
      default: '📍'
    };
    return icons[type] || icons.default;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            ✨ Ihr Reiseplan für {formData.destination}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
            <Chip label={`${formData.duration} ${formData.duration === '1' ? 'Tag' : 'Tage'}`} color="primary" />
            <Chip label={`Budget: ${formData.budget}€`} color="secondary" />
            <Chip label={`Kosten: ${totalCost}€`} color={totalCost > parseInt(formData.budget) ? 'error' : 'success'} />
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Interessen: {formData.interests.join(', ')}
            </Typography>
          </Box>
        </Paper>

        {/* Itinerary */}
        {filteredItinerary.map((day) => (
          <Paper key={day.day} elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Tag {day.day}: {day.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {day.activities.map((activity, idx) => (
              <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" color="text.secondary" sx={{ minWidth: 60 }}>
                      {activity.time}
                    </Typography>
                    <Typography variant="h6">
                      {getActivityIcon(activity.type)} {activity.name}
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ ml: 'auto' }}>
                      {activity.cost > 0 ? `${activity.cost}€` : 'Kostenlos'}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}

            <Typography variant="body2" align="right" sx={{ mt: 1, fontWeight: 'bold' }}>
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
          >
            🔄 Neue Reise planen
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            fullWidth
          >
            ← Zurück zum Dashboard
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default TripResultPage;
