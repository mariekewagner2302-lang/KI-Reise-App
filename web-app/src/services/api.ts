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
