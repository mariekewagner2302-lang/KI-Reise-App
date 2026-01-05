import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { generateTripPlan } from '../services/api';

const TripPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    duration: '',
    interests: [] as string[]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const availableInterests = [
    'Kultur & Museen',
    'Essen & Restaurants',
    'Nachtleben',
    'Natur & Parks',
    'Shopping',
    'Sport & Aktivitäten',
    'Geschichte',
    'Architektur'
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validierung
    if (!formData.destination || !formData.budget || !formData.duration) {
      setError('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    if (formData.interests.length === 0) {
      setError('Bitte wählen Sie mindestens ein Interesse aus');
      return;
    }

    setLoading(true);

    try {
      // KI-Reiseplan generieren
      const tripPlan = await generateTripPlan({
        destination: formData.destination,
        budget: parseInt(formData.budget),
        duration: parseInt(formData.duration),
        interests: formData.interests
      });

      // Navigiere mit echten KI-Daten
      navigate('/trip-result', { state: tripPlan });
    } catch (err: any) {
      console.error('Planning error:', err);
      setError(
        err.response?.data?.detail || 
        'Fehler beim Erstellen des Reiseplans. Bitte versuchen Sie es erneut.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            ✈️ Neue Reise planen
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Erzählen Sie uns von Ihrer Traumreise und unsere KI erstellt einen personalisierten Reiseplan für Sie!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Reiseziel"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="z.B. Paris, Barcelona, Rom"
              margin="normal"
              disabled={loading}
            />

            <TextField
              fullWidth
              required
              label="Budget (€)"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              placeholder="z.B. 1000"
              margin="normal"
              disabled={loading}
              inputProps={{ min: 50, max: 50000 }}
            />

            <FormControl fullWidth margin="normal" required disabled={loading}>
              <InputLabel>Reisedauer</InputLabel>
              <Select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                label="Reisedauer"
              >
                <MenuItem value="1">1 Tag</MenuItem>
                <MenuItem value="2">2 Tage</MenuItem>
                <MenuItem value="3">3 Tage</MenuItem>
                <MenuItem value="4">4 Tage</MenuItem>
                <MenuItem value="5">5 Tage</MenuItem>
                <MenuItem value="7">1 Woche</MenuItem>
                <MenuItem value="14">2 Wochen</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Ihre Interessen *
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {availableInterests.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    onClick={() => !loading && handleInterestToggle(interest)}
                    color={formData.interests.includes(interest) ? 'primary' : 'default'}
                    disabled={loading}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3 }}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? '🤖 KI erstellt Ihren Reiseplan...' : '🚀 Reiseplan erstellen'}
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              ← Zurück zum Dashboard
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default TripPlannerPage;
