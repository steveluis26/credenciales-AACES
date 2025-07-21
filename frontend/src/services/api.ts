import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',  // Ajusta según tu backend
});

export const getCredencial = async (codigo: string) => {
  const response = await api.get(`/credenciales/${codigo}`);
  return response.data;
};