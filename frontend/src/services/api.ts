import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // cambia puerto si tu backend corre en otro puerto
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// services/api.ts
export const buscarCredencial = async (query: string) => {
  const response = await fetch(`/api/credenciales?q=${query}`);
  return response.json();
};

export default api;
