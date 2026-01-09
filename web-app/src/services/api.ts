import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface SignupData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    tier: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
  return response.data;
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
// Planning Service API
const PLANNING_API = 'http://localhost:3002/api/v1';

export interface TripPlanRequest {
  destination: string;
  budget: number;
  duration: number;
  interests: string[];
}

export interface Activity {
  time: string;
  name: string;
  type: string;
  cost: number;
  description: string;
}

export interface Day {
  day: number;
  title: string;
  activities: Activity[];
}

export interface TripPlan {
  destination: string;
  total_cost: number;
  days: Day[];
}

// KI-Reiseplan generieren
export const generateTripPlan = async (data: TripPlanRequest): Promise<TripPlan> => {
  const response = await axios.post(`${PLANNING_API}/planning/generate`, data);
  return response.data;
};

// Logout
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
};
