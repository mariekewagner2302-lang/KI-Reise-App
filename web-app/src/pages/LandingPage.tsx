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
  Stack
} from '@mui/material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: '🤖', title: 'KI-Powered', desc: 'GPT-4 erstellt personalisierte Reisepläne' },
    { icon: '⚡', title: 'Schnell', desc: 'Reiseplan in 10 Sekunden fertig' },
    { icon: '💰', title: 'Budget-Smart', desc: 'Optimiert für Ihr Budget' },
    { icon: '🎯', title: 'Personalisiert', desc: 'Basierend auf Ihren Interessen' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #E8DCC4 0%, #D4A5A5 100%)', 
      py: 8 
    }}>
      <Container maxWidth="lg">
        <Paper elevation={10} sx={{ 
          p: 6, 
          mb: 4, 
          textAlign: 'center', 
          borderRadius: 4,
          backgroundColor: '#FAF8F5'
        }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ color: '#5A4A3A' }}>
            ✈️ TravelPlanner
          </Typography>
          <Typography variant="h5" sx={{ color: '#8B7B6A' }} paragraph>
            Ihre KI-powered Reiseplanung
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#8B7B6A', maxWidth: 600, mx: 'auto', mb: 4 }}>
            Geben Sie Ihr Reiseziel, Budget und Interessen ein – unsere KI erstellt einen personalisierten Tagesplan mit echten Sehenswürdigkeiten, Restaurants und Aktivitäten.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={2}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/signup')} 
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem',
                backgroundColor: '#D4A5A5',
                color: '#5A4A3A',
                '&:hover': { backgroundColor: '#C49595' }
              }}
            >
              🚀 Kostenlos starten
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => navigate('/login')} 
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem',
                borderColor: '#B8A390',
                color: '#5A4A3A',
                '&:hover': { borderColor: '#A89380', backgroundColor: 'rgba(184, 163, 144, 0.1)' }
              }}
            >
              Anmelden
            </Button>
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {features.map((feature, idx) => (
            <Card 
              key={idx}
              sx={{ 
                flex: '1 1 200px', 
                minWidth: 200,
                maxWidth: 280,
                textAlign: 'center', 
                p: 2,
                backgroundColor: '#FAF8F5',
                border: '2px solid #E8DCC4',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', borderColor: '#D4A5A5' }
              }}
            >
              <CardContent>
                <Typography variant="h2" component="div" sx={{ mb: 2 }}>
                  {feature.icon}
                </Typography>
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#5A4A3A' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: '#FAF8F5' }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#5A4A3A' }}>
            🎯 Wie es funktioniert
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box sx={{ flex: '1 1 250px', maxWidth: 350 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#D4A5A5', fontWeight: 'bold' }}>
                1️⃣ Eingeben
              </Typography>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                Ziel, Budget, Dauer & Interessen
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 250px', maxWidth: 350 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#A8B5A0', fontWeight: 'bold' }}>
                2️⃣ KI arbeitet
              </Typography>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                GPT-4 erstellt Ihren Plan (10-15 Sek)
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 250px', maxWidth: 350 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#B8A390', fontWeight: 'bold' }}>
                3️⃣ Reisen!
              </Typography>
              <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
                Tagesplan mit Uhrzeiten & Kosten
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
