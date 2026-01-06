import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Card, CardContent, Stack } from '@mui/material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 8 }}>
      <Container maxWidth="lg">
        <Paper elevation={10} sx={{ p: 6, mb: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            ✈️ TravelPlanner
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Ihre KI-powered Reiseplanung
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Geben Sie Ihr Reiseziel, Budget und Interessen ein – unsere KI erstellt einen personalisierten Tagesplan mit echten Sehenswürdigkeiten, Restaurants und Aktivitäten.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" size="large" onClick={() => navigate('/signup')} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
              🚀 Kostenlos starten
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/login')} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
              Anmelden
            </Button>
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card sx={{ flex: '1 1 250px', maxWidth: 300, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h2" sx={{ mb: 2 }}>🤖</Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">KI-Powered</Typography>
              <Typography variant="body2" color="text.secondary">GPT-4 erstellt personalisierte Reisepläne</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 250px', maxWidth: 300, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h2" sx={{ mb: 2 }}>⚡</Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">Schnell</Typography>
              <Typography variant="body2" color="text.secondary">Reiseplan in 10 Sekunden fertig</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 250px', maxWidth: 300, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h2" sx={{ mb: 2 }}>💰</Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">Budget-Smart</Typography>
              <Typography variant="body2" color="text.secondary">Optimiert für Ihr Budget</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 250px', maxWidth: 300, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h2" sx={{ mb: 2 }}>🎯</Typography>
              <Typography variant="h6" gutterBottom fontWeight="bold">Personalisiert</Typography>
              <Typography variant="body2" color="text.secondary">Basierend auf Ihren Interessen</Typography>
            </CardContent>
          </Card>
        </Box>

        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>🎯 Wie es funktioniert</Typography>
          <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box sx={{ flex: '1 1 250px', maxWidth: 350 }}>
              <Typography variant="h6" gutterBottom>1️⃣ Eingeben</Typography>
              <Typography variant="body2" color="text.secondary">Ziel, Budget, Dauer & Interessen</Typography>
            </Box>
            <Box sx={{ flex: '1 1 250px', maxWidth: 350 }}>
              <Typography variant="h6" gutterBottom>2️⃣ KI arbeitet</Typography>
              <Typography variant="body2" color="text.secondary">GPT-4 erstellt Ihren Plan (10-15 Sek)</Typography>
            </Box>
            <Box sx={{ flex: '1 1 250px', maxWidth: 350 }}>
              <Typography variant="h6" gutterBottom>3️⃣ Reisen!</Typography>
              <Typography variant="body2" color="text.secondary">Tagesplan mit Uhrzeiten & Kosten</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
