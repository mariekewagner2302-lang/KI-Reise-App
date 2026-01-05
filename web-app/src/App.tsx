import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import TripPlannerPage from './pages/TripPlannerPage';
import TripResultPage from './pages/TripResultPage';
import { isAuthenticated } from './services/api';

const theme = createTheme({
  palette: { 
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trip-planner" 
            element={
              <ProtectedRoute>
                <TripPlannerPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trip-result" 
            element={
              <ProtectedRoute>
                <TripResultPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
