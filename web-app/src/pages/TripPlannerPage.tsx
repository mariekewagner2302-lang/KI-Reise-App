import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  OutlinedInput,
  CircularProgress
} from '@mui/material';
import { generateTripPlan } from '../services/api';

const INTERESTS = [
  'Kultur & Museen',
  'Essen & Restaurants',
  'Natur & Outdoor',
  'Shopping',
  'Nachtleben',
  'Geschichte',
  'Strand & Meer',
  'Sport & Aktivitäten'
];

const TripPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    duration: '',
    interests: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tripPlan = await generateTripPlan({
        destination: formData.destination,
        budget: Number(formData.budget),
        duration: Number(formData.duration),
        interests: formData.interests
      });

      navigate('/trip-result', { state: { tripPlan } });
    } catch (error) {
      console.error('Fehler beim Erstellen des Reiseplans:', error);
      alert('Fehler beim Erstellen des Reiseplans. Bitte versuchen Sie es erneut.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #E8DCC4 0%, #B5C2A8 100%)',
      py: 4
    }}>
      <Container maxWidth="md">
        <Paper elevation={10} sx={{ p: 4, backgroundColor: '#FAF8F5', borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#5A4A3A', fontWeight: 'bold', mb: 3 }}>
            ✈️ Neue Reise planen
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Reiseziel"
              margin="normal"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
              placeholder="z.B. Paris, Barcelona, Rom"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' }
              }}
            />

            <TextField
              fullWidth
              label="Budget (€)"
              type="number"
              margin="normal"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
              placeholder="z.B. 500"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' }
              }}
            />

            <TextField
              fullWidth
              label="Dauer (Tage)"
              type="number"
              margin="normal"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              placeholder="z.B. 3"
              inputProps={{ min: 1, max: 14 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  '&:hover fieldset': { borderColor: '#D4A5A5' },
                  '&.Mui-focused fieldset': { borderColor: '#D4A5A5' }
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#5A4A3A' }
              }}
            />

            <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#5A4A3A' } }}>Interessen</InputLabel>
              <Select
                multiple
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value as string[] })}
                input={<OutlinedInput label="Interessen" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip 
                        key={value} 
                        label={value} 
                        size="small"
                        sx={{ 
                          backgroundColor: '#D4A5A5',
                          color: '#5A4A3A'
                        }}
                      />
                    ))}
                  </Box>
                )}
                sx={{
                  backgroundColor: '#FFF',
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D4A5A5' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4A5A5' }
                }}
              >
                {INTERESTS.map((interest) => (
                  <MenuItem key={interest} value={interest}>
                    {interest}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                mt: 4,
                backgroundColor: '#D4A5A5',
                color: '#5A4A3A',
                fontWeight: 'bold',
                py: 1.5,
                '&:hover': { backgroundColor: '#C49595' },
                '&:disabled': { backgroundColor: '#E8DCC4', color: '#8B7B6A' }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1, color: '#8B7B6A' }} />
                  KI erstellt Ihren Reiseplan...
                </>
              ) : (
                '🚀 Reiseplan erstellen'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#8B7B6A' }}>
              💡 Die KI erstellt einen personalisierten Tagesplan mit echten Orten und Preisen
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TripPlannerPage;
