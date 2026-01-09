import axios from 'axios';

const API_BASE_URL = 'https://travelplanner-user.onrender.com/api/v1';
const PLANNING_API = 'https://travelplanner-planning.onrender.com/api/v1';

export const saveAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

axios.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
  if (response.data.token) {
    saveAuthToken(response.data.token);
    localStorage.setItem('userEmail', data.email);
  }
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
  if (response.data.token) {
    saveAuthToken(response.data.token);
    localStorage.setItem('userEmail', data.email);
  }
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
};

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

export const generateTripPlan = async (data: TripPlanRequest): Promise<TripPlan> => {
  const response = await axios.post(`${PLANNING_API}/planning/generate`, data);
  return response.data;
};
