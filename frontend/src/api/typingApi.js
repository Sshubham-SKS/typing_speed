import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/typing';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const saveResult = async (data) => {
  return axios.post(`${API_URL}/saveResult`, data, getAuthHeaders());
};

export const getResults = async (userId) => {
  return axios.get(`${API_URL}/results/${userId}`, getAuthHeaders());
};

export const getLast5Results = async (userId) => {
  return axios.get(`${API_URL}/last5/${userId}`, getAuthHeaders());
};

export const getAnalytics = async (userId) => {
  return axios.get(`${API_URL}/analytics/${userId}`, getAuthHeaders());
};

export const generateText = async () => {
  return axios.get(`${API_URL}/generateText`); 
};
